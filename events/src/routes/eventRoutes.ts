import {
  auth,
  BadRequestError,
  NotAuthorizedError,
  NotFound,
  validateRequest
} from "@kmevents/common";
import mongoose from "mongoose";
import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { Event } from "../models/Event";
import { User } from "../models/User";

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
    console.log(await Event.find({}));
    const events = await Event.find({}).populate("user");
    res.send(events);
  }
);

route.get(
  "/event/single/:eventId",
  async (req: Request, res: Response): Promise<void> => {
    const event = await Event.findById(req.params.eventId).populate("user");
    if (!event) {
      throw new NotFound();
    }
    res.send(event);
  }
);

route.post(
  "/event/edit/:eventId",
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
    const { name, type, description, city, town, date, _id } = req.body;
    const event = await Event.findById(_id);
    const userId = req.body.user._id;
    if (!event) {
      throw new NotFound();
    }

    if (userId !== req.currentUser?._id) {
      throw new NotAuthorizedError();
    }
    event.name = name;
    event.type = type;
    event.description = description;
    event.city = city;
    event.town = town;
    event.date = date;
    await event.save();
    res.send(event);
  }
);

route.post(
  "/event/cancel/:eventId",
  auth,
  async (req: Request, res: Response) => {
    console.log(await Event.find({}));
    const event = await Event.findById(req.params.eventId).populate("user");
    if (!event) {
      throw new NotFound();
    }
    // @ts-ignore
    if (req.currentUser?._id.toString() !== event.user._id.toString()) {
      throw new NotAuthorizedError();
    }
    event.cancelled = true;
    await event.save();
    res.send(event);
  }
);

route.post(
  "/event/join/:eventId",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.currentUser?._id);
    if (!user) {
      throw new BadRequestError("User not found");
    }
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      throw new BadRequestError("Event not found");
    }

    event.attendees = [
      ...event.attendees,
      {
        _id: mongoose.Types.ObjectId(user._id),
        name: user.name,
        photos: user.photos
      }
    ];
    await event.save();
    res.send(event);
  }
);

route.post(
  "/event/cancel/:eventId",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const event = await Event.findOne({ _id: req.params.eventId });
    const userInEvent = event?.attendees.find(
      att => att._id === mongoose.Types.ObjectId(req.currentUser?._id)
    );
    if (!userInEvent) {
      throw new BadRequestError("this user is not in this event");
    }
    event!.attendees = event!.attendees.filter(
      att => att._id !== mongoose.Types.ObjectId(req.currentUser?._id)
    );
    await event?.save();
    res.send(event);
  }
);

export { route as eventRoutes };
