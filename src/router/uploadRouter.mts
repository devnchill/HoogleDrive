import { Router } from "express";
import {
  uploadFormGET,
  uploadFormPOST,
} from "../controller/uploadController.mjs";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const uploadRouter = Router();

uploadRouter.get("/", uploadFormGET);
uploadRouter.post("/", upload.single("uploaded_file"), uploadFormPOST);

export default uploadRouter;
