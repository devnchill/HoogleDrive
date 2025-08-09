import type { NextFunction, Request, Response } from "express";

export async function getLandingPage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.isAuthenticated()) {
    return res.render("index");
  }
  res.redirect("/signup");
}
