import type { NextFunction, Request, Response } from "express";

export function getSigUpForm(
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  res.render("signup");
}
