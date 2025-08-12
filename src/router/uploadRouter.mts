import { Router } from "express";
import { uploadFormGet } from "../controller/uploadController.mjs";
import multer from "multer";
import ensureAuthed from "../auth/ensureAuth.mjs";

const upload = multer({ dest: "./public/data/" });
const uploadRouter = Router();

uploadRouter.use(ensureAuthed);
uploadRouter.get("/", uploadFormGet);

uploadRouter.post("/", upload.single("uploaded_file"), (req, res) => {
  console.log(req.file, req.body);
});
export default uploadRouter;
