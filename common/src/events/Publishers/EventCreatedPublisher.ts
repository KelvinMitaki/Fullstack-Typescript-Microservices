import { Publisher } from "../BasePublisher";
import { EventCreated } from "../EventCreated";
import { Subjects } from "../subjects";

export class EventCreatedPublisher extends Publisher<EventCreated> {
  subject: Subjects.EventCreated = Subjects.EventCreated;
}
