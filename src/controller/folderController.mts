import type { Request, Response, NextFunction } from "express";
import prismaClient from "../lib/prismaClient.mjs";

export async function getAllFolders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const folders = await prismaClient.folder.findMany();
  res.render("folders", { folders });
}
