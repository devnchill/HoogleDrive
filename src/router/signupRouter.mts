import { Router } from "express";
import {
  getSigUpForm,
  postSigUpForm,
  validateUser,
} from "../controller/signupControllet.mjs";
const signupRouter = Router();

signupRouter.get("/", getSigUpForm);
signupRouter.post("/", validateUser, postSigUpForm);

export default signupRouter;
