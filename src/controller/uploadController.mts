import type { NextFunction, Request, Response } from "express";
import prismaClient from "../lib/prismaClient.mjs";

export async function uploadFormGET(
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const folders = await prismaClient.folder.findMany();
  res.render("partial/upload", { folders });
}

export async function uploadFormPOST(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user?.id) {
    return next(new Error("UserId Not Found"));
  }
  if (!req.file?.filename) {
    return next(new Error("FileName Not Found"));
  }
  const userId = req.user.id;
  const { folderId } = req.body;
  await prismaClient.file.create({
    data: {
      name: req.file?.filename,
      userId,
      folderId: parseInt(folderId),
    },
  });
  res.redirect(`/folders/${folderId}/files`);
}
