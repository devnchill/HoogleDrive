import type { NextFunction, Request, Response } from "express";
import prismaClient from "../lib/prismaClient.mjs";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

export function getSigUpForm(
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  res.render("signup", {
    formData: {},
    err: {},
  });
}

export const validateUser = [
  body("userName").trim().notEmpty().withMessage("UserName cannot be empty"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("invalid email"),
  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 to 20 characters."),
  body("confirmPassword")
    .trim()
    .custom((confirmPassword, { req }) => {
      const { password } = req.body;
      if (password !== confirmPassword) {
        throw new Error("Passwords must match.");
      }
      return true;
    }),
];

export async function postSigUpForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMap: Record<string, string> = {};
    for (const error of errors.array()) {
      if (error.type === "field") errorMap[error.path] = error.msg;
    }
    return res.status(400).render("signup", {
      formData: req.body,
      err: errorMap,
    });
  }
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
      data: { userName, email, hashedPassword },
    });
    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  } catch (err: any) {
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return res.status(400).render("signup", {
        formData: req.body,
        err: { email: "Email already in use" },
      });
    }
    return next(err);
  }
}
