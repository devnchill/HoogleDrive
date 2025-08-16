import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  getAllFolders,
} from "../controller/folderController.mjs";
import ensureAuthed from "../auth/ensureAuth.mjs";

const folderRouter = Router();

folderRouter.use(ensureAuthed);
folderRouter.get("/", getAllFolders);
folderRouter.post("/", createFolder);
folderRouter.delete("/:folderId", deleteFolder);

export default folderRouter;
