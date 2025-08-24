import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  getAllFolders,
} from "../controller/folderController.mjs";
import ensureLoggedIn from "../auth/ensureAuth.mjs";
import fileRouter from "./fileRouter.mjs";
import { getAllFiles } from "../controller/fileController.mjs";

const folderRouter = Router();

folderRouter.use(ensureLoggedIn);
folderRouter.get("/", getAllFolders);
folderRouter.post("/", createFolder);
folderRouter.delete("/:folderId", deleteFolder);

folderRouter.get("/files/all", getAllFiles);
folderRouter.use("/:folderId/files", fileRouter);

export default folderRouter;
