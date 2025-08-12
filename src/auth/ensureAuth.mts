import type { Request, Response, NextFunction } from "express";

export default function ensureAuthed(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
}
