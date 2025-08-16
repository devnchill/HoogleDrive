import { Router } from "express";
import {
  createFolder,
  getAllFolders,
} from "../controller/folderController.mjs";
import ensureAuthed from "../auth/ensureAuth.mjs";

const folderRouter = Router();

folderRouter.use(ensureAuthed);
folderRouter.get("/", getAllFolders);
folderRouter.post("/", createFolder);

export default folderRouter;
