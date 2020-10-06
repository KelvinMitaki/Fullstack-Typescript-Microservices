import mongoose from "mongoose";

interface EventAttrs {
  name: string;
  type: string;
  description: string;
  city: string;
  town: string;
  date: string;
  userId: string;
}

interface EventDoc extends mongoose.Document {
  name: string;
  type: string;
  description: string;
  city: string;
  town: string;
  date: string;
  userId: string;
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
    userId: {
      type: String,
      required: true
    },
    attendees: {
      type: [String]
    }
  },
  { timestamps: true }
);

EventSchema.statics.build = (attrs: EventAttrs): mongoose.Document => {
  return new Event(attrs);
};

const Event = mongoose.model<EventDoc, EventModel>("Event", EventSchema);

export { Event };
