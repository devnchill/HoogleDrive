import type { NextFunction, Request, Response } from "express";
import prismaClient from "../lib/prismaClient.mjs";
import supabaseClient from "../lib/supabaseClient.mjs";

export async function uploadFormGET(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (!req.user?.id) return res.json("unauthorized");
  const folders = await prismaClient.folder.findMany({
    where: {
      userId: req.user.id,
    },
  });
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
  if (!req.file?.buffer) {
    return next(new Error("File buffer Not Found"));
  }
  const userId = req.user.id;
  const { folderId } = req.body;
  const file = req.file.buffer;
  const fileName = req.file.originalname;
  const filePath = `${userId}/${folderId}/${fileName}`;

  const { error } = await supabaseClient.storage
    .from("HoogleDrive")
    .upload(filePath, file);

  if (error) {
    return next(new Error(`File upload failed: ${error.message}`));
  }

  await prismaClient.file.create({
    data: {
      name: fileName,
      userId,
      folderId: parseInt(folderId),
      storagePath: filePath,
      fileSize: file.length,
    },
  });
  res.redirect(`/folders/${folderId}/files`);
}
