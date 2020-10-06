import express from "express";
import bodyParser from "body-parser";
import CookieSession from "cookie-session";
import { eventRoutes } from "./routes/eventRoutes";
import "express-async-errors";
import { errorHandler, NotFound } from "@kmevents/common";
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

app.use("/api", eventRoutes);

// NOT FOUND ROUTES
app.all(
  "*",
  async (): Promise<void> => {
    throw new NotFound();
  }
);

app.use(errorHandler);

export { app };
