import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface EventAttrs {
  name: string;
  type: string;
  description: string;
  city: string;
  town: string;
  date: string;
  user: mongoose.Types.ObjectId;
  cancelled?: boolean;
}

interface EventDoc extends mongoose.Document {
  name: string;
  type: string;
  description: string;
  city: string;
  town: string;
  date: string;
  user: mongoose.Types.ObjectId;
  version: number;
  cancelled?: boolean;
  attendees: { _id: mongoose.Types.ObjectId; name: string; photos: string[] }[];
}

interface EventModel extends mongoose.Model<EventDoc> {
  build(attrs: EventAttrs): EventDoc;
}

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    town: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    cancelled: {
      type: Boolean,
      default: false
    },
    attendees: {
      type: [
        {
          _id: mongoose.Types.ObjectId,
          name: String,
          photos: [String]
        }
      ]
    }
  },
  { timestamps: true }
);

EventSchema.set("versionKey", "version");

EventSchema.plugin(updateIfCurrentPlugin);

EventSchema.statics.build = (attrs: EventAttrs): mongoose.Document => {
  return new Event(attrs);
};

const Event = mongoose.model<EventDoc, EventModel>("Event", EventSchema);

export { Event };
