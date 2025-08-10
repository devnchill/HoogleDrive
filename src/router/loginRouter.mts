import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import passport from "passport";

const loginRouter = Router();

loginRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = req.session.messages || [];
    const message = messages.length > 0 ? messages[0] : null;
    req.session.messages = [];
    res.render("login", { message });
  } catch (err) {
    return next(err);
  }
});

loginRouter.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureMessage: "invalid username or password",
  }),
);
export default loginRouter;
