import { Router } from "express";
import ensureLoggedIn from "../auth/ensureAuth.mjs";
import {
  deleteFile,
  editFile,
  getFilesOfAFolder,
} from "../controller/fileController.mjs";

const fileRouter = Router({ mergeParams: true });

fileRouter.use(ensureLoggedIn);

fileRouter.get("/", getFilesOfAFolder);
fileRouter.delete("/fileId", deleteFile);
fileRouter.put("/fileId", editFile);

export default fileRouter;
