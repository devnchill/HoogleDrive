import express from "express";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "../generated/prisma/index.js";
import indexRouter from "./router/indexRouter.mjs";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import "./auth/config.mjs";
import signupRouter from "./router/signupRouter.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "src", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: "a santa at nasa",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  }),
);
app.use(passport.session());

app.use("/signup", signupRouter);
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log("Server Listening on Port", PORT);
});
