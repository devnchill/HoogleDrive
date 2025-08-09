import type { NextFunction, Request, Response } from "express";

export default class indexController {
  static async indexGet(req: Request, res: Response, next: NextFunction) {
    res.render("index");
  }
}
