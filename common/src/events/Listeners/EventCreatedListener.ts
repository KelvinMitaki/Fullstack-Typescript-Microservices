import { Message } from "node-nats-streaming";
import { Listener } from "../BaseListener";
import { EventCreated } from "../EventCreated";
import { Subjects } from "../subjects";

export class EventCreatedListener extends Listener<EventCreated> {
  subject: Subjects.EventCreated = Subjects.EventCreated;
  queueGroupName = "events-service";
  onMessage(data: EventCreated["data"], msg: Message) {
    console.log("Event data", data);
    msg.ack();
  }
}
