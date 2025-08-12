import type { Request, Response, NextFunction } from "express";
export function uploadFormGet(req: Request, res: Response, next: NextFunction) {
  res.render("upload");
}

export function uploadFormPost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.render("upload");
}
