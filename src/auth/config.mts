import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import prismaClient from "../lib/prismaClient.mjs";
import bcryptjs from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
    },
    async (userName: string, password: string, done) => {
      try {
        const user = await prismaClient.user.findFirst({
          where: {
            userName,
          },
        });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcryptjs.compare(password, user.hashedPassword);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});
