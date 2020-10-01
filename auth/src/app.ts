import express from "express";
import bodyParser from "body-parser";
import CookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true);

app.use(bodyParser.json());

app.use(
  CookieSession({
    signed: true,
    secure: true,
    sameSite: true,
    httpOnly: true,
    secret: process.env!.COOKIE_SECRET
  })
);

export { app };
