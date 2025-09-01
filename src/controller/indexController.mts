import type { NextFunction, Request, Response } from "express";
import prismaClient from "../lib/prismaClient.mjs";

export async function getLandingPage(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (req.isAuthenticated()) {
    const user = req.user;
    const folders = await prismaClient.folder.findMany({
      where: {
        userId: user.id,
      },
    });
    const files = await prismaClient.file.findMany({
      where: {
        userId: user.id,
      },
    });
    return res.render("index", { user: user, folders, files });
  }
  res.redirect("/signup");
}
