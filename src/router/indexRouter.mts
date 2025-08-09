import { Router } from "express";
import indexController from "../controller/indexController.mjs";
const indexRouter = Router();

indexRouter.use(ensureAuth);
indexRouter.get("/", indexController.indexGet);
