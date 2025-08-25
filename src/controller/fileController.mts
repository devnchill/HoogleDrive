import type { Request, Response, NextFunction } from "express";
import prismaClient from "../lib/prismaClient.mjs";

export async function getAllFiles(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const files = await prismaClient.file.findMany({
    where: {
      userId: req.user.id,
    },
  });
  res.render("files", { files });
}

export async function getFilesOfAFolder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!req.params.folderId) {
    return next(new Error("No such folder found"));
  }
  const { folderId } = req.params;
  const folderIdInt = parseInt(folderId);
  if (isNaN(folderIdInt)) {
    return next(new Error("No such folder found"));
  }
  const files = await prismaClient.file.findMany({
    where: {
      userId: req.user.id,
      folderId: folderIdInt,
    },
  });
  res.render("files", { files, folderId: folderIdInt });
}

export async function deleteFile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.params.fileId) {
    return next(new Error("file id not found"));
  }
  const { fileId } = req.params;
  if (!req.user?.id) {
    return next(new Error("user id not found"));
  }
  const userId = req.user?.id;
  await prismaClient.file.delete({
    where: {
      id: parseInt(fileId),
      userId,
    },
  });
  return res.json({ success: true, fileId });
}
export async function editFile(fileName: string) {}
