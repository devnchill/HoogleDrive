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
export async function deleteFile(fileId: number) {}
export async function editFile(fileName: string) {}
