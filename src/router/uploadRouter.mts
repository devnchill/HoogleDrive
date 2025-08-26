import { Router } from "express";
import {
  uploadFormGET,
  uploadFormPOST,
} from "../controller/uploadController.mjs";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer({
  dest: join(__dirname, "../../public/data"),
});
const uploadRouter = Router();

uploadRouter.get("/", uploadFormGET);
uploadRouter.post("/", upload.single("uploaded_file"), uploadFormPOST);

export default uploadRouter;
