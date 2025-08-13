import { Router } from "express";
import { getAllFolders } from "../controller/folderController.mjs";
import ensureAuthed from "../auth/ensureAuth.mjs";
const folderRouter = Router();

folderRouter.use(ensureAuthed);
folderRouter.get("/", getAllFolders);
export default folderRouter;
