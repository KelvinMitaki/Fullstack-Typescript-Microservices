import { auth, validateRequest } from "@kmevents/common";
import mongoose from "mongoose";
import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { Event } from "../models/Event";

const route = Router();

route.post(
  "/event/new",
  auth,
  check("name").trim().notEmpty().withMessage("Event name cannot be empty"),
  check("type").trim().notEmpty().withMessage("Event type cannot be empty"),
  check("description")
    .trim()
    .notEmpty()
    .withMessage("Event name cannot be empty"),
  check("city").trim().notEmpty().withMessage("Event city cannot be empty"),
  check("town").trim().notEmpty().withMessage("Event town cannot be empty"),
  check("date").trim().notEmpty().withMessage("Event date cannot be empty"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { name, type, description, city, town, date } = req.body;
    const event = Event.build({
      name,
      type,
      description,
      city,
      town,
      date,
      user: mongoose.Types.ObjectId(req.currentUser!._id)
    });
    await event.save();
    res.send(event);
  }
);

route.get(
  "/event/all",
  async (req: Request, res: Response): Promise<void> => {
    const events = await Event.find({}).populate("user");
    res.send(events);
  }
);

export { route as eventRoutes };
