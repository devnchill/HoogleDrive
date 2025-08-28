import { Router } from "express";
import {
  uploadFormGET,
  uploadFormPOST,
} from "../controller/uploadController.mjs";
import multer, { memoryStorage } from "multer";

const upload = multer({ storage: memoryStorage() });
const uploadRouter = Router();

uploadRouter.get("/", uploadFormGET);
uploadRouter.post("/", upload.single("uploaded_file"), uploadFormPOST);

export default uploadRouter;
