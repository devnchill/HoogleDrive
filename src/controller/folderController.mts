import type { Request, Response, NextFunction } from "express";
import prismaClient from "../lib/prismaClient.mjs";

export async function getAllFolders(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const folders = await prismaClient.folder.findMany({
    where: {
      userId: req.user?.id,
    },
  });
  res.render("folders", { folders });
}

export async function createFolder(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { folderName } = req.body;
  await prismaClient.folder.create({
    data: {
      name: folderName,
      userId: req.user?.id,
    },
  });
  res.redirect("/folders");
}
