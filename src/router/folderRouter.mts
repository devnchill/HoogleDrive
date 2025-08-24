import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  getAllFolders,
} from "../controller/folderController.mjs";
import ensureLoggedIn from "../auth/ensureAuth.mjs";
import fileRouter from "./fileRouter.mjs";

const folderRouter = Router();

folderRouter.use(ensureLoggedIn);
folderRouter.get("/", getAllFolders);
folderRouter.post("/", createFolder);
folderRouter.delete("/:folderId", deleteFolder);

folderRouter.delete("/:folderId/files", fileRouter);

export default folderRouter;
