import { Router } from "express";
import ensureAuthed from "../auth/ensureAuth.mjs";
import {
  deleteFile,
  editFile,
  getAllFiles,
} from "../controller/fileController.mjs";

const fileRouter = Router();

fileRouter.use(ensureAuthed);

fileRouter.get("/", getAllFiles);
fileRouter.delete("/fileId", deleteFile);
fileRouter.put("/fileId", editFile);

export default fileRouter;
