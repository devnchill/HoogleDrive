import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prismaClient.mjs";

export async function getAllFolders(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const folders = await prisma.folder.findMany({
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
  await prisma.folder.create({
    data: {
      name: folderName,
      userId: req.user?.id,
    },
  });
  res.redirect("/folders");
}

export async function deleteFolder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.params.folderId) {
    return res.status(401).json({ error: "Invalid FolderId" });
  }
  const folderId = Array.isArray(req.params.folderId)
    ? req.params.folderId[0]
    : req.params.folderId;
  if (!folderId) return next(new Error("invalid FolderId"));
  if (!req.user?.id) {
    return next(new Error("user id not found"));
  }
  const userId = req.user?.id;
  await prisma.folder.delete({
    where: {
      id: parseInt(folderId),
      userId,
    },
  });
  return res.json({ success: true, folderId });
}
