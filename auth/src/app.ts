import express from "express";
import bodyParser from "body-parser";
import CookieSession from "cookie-session";
import { useroutes } from "./routes/userRoutes";

const app = express();

app.set("trust proxy", true);

app.use(bodyParser.json());

app.use(
  CookieSession({
    signed: true,
    sameSite: true,
    httpOnly: true,
    secret: process.env!.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 7
  })
);

app.use("/api", useroutes);

export { app };
