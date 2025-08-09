import { Router } from "express";
import { getSigUpForm } from "../controller/signupControllet.mjs";
const signupRouter = Router();

signupRouter.get("/", getSigUpForm);

export default signupRouter;
