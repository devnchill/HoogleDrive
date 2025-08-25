import { Router } from "express";
import ensureLoggedIn from "../auth/ensureAuth.mjs";
import {
  deleteFile,
  editFile,
  getAllFiles,
} from "../controller/fileController.mjs";

const fileRouter = Router();

fileRouter.use(ensureLoggedIn);

fileRouter.get("/", getAllFiles);
fileRouter.delete("/fileId", deleteFile);
fileRouter.put("/fileId", editFile);

export default fileRouter;
