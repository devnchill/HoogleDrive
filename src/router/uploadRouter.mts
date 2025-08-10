import { Router } from "express";
import { uploadFormGet } from "../controller/uploadController.mjs";
import multer from "multer";

const upload = multer({ dest: "./public/data/" });
const uploadRouter = Router();

uploadRouter.get("/", uploadFormGet);

uploadRouter.post("/", upload.single("uploaded_file"), (req, res) => {
  console.log(req.file, req.body);
});
export default uploadRouter;
