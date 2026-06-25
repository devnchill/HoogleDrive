import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient.mjs";

export async function getLandingPage(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (req.isAuthenticated()) {
    const user = req.user;
    const folders = await prisma.folder.findMany({
      where: {
        userId: user.id,
      },
    });
    const files = await prisma.file.findMany({
      where: {
        userId: user.id,
      },
    });
    return res.render("index", { user: user, folders, files });
  }
  res.redirect("/signup");
}
