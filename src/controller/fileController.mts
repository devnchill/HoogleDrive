import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prismaClient.mjs";
import supabaseClient from "../lib/supabaseClient.mjs";

export async function getAllFiles(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const files = await prisma.file.findMany({
    where: {
      userId: req.user.id,
    },
  });
  res.render("allFiles", { files });
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
  const folderId = Array.isArray(req.params.folderId)
    ? req.params.folderId[0]
    : req.params.folderId;
  if (!folderId) {
    return next(new Error(`Failed to load files`));
  }

  const folderIdInt = parseInt(folderId);
  if (isNaN(folderIdInt)) {
    return next(new Error("No such folder found"));
  }
  const files = await prisma.file.findMany({
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
  const fileId = Array.isArray(req.params.fileId)
    ? req.params.fileId[0]
    : req.params.fileId;
  if (!fileId) return next(new Error(`Failed to load files`));

  if (!req.user?.id) {
    return next(new Error("user id not found"));
  }
  const userId = req.user?.id;
  await prisma.file.delete({
    where: {
      id: parseInt(fileId),
      userId,
    },
  });
  return res.json({ success: true, fileId });
}

export async function downloadFile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fileId = Array.isArray(req.params.fileId)
    ? req.params.fileId[0]
    : req.params.fileId;
  if (!fileId) return next(new Error(`Failed to load files`));
  const file = await prisma.file.findUnique({
    where: { id: parseInt(fileId) },
  });
  if (!file) return next(new Error("File not found"));
  const { data, error } = await supabaseClient.storage
    .from("HoogleDrive")
    .download(file.storagePath);
  if (error) return next(new Error(error.message));
  if (!data) return next(new Error("No data received"));
  const buffer = Buffer.from(await data.arrayBuffer());
  res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
  res.setHeader("Content-Type", "application/octet-stream");
  res.send(buffer);
}

export async function editFile(_fileName: string) {}
