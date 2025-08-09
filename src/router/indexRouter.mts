import { Router } from "express";
const indexRouter = Router();
import { getLandingPage } from "../controller/indexController.mjs";

indexRouter.get("/", getLandingPage);

export default indexRouter;
