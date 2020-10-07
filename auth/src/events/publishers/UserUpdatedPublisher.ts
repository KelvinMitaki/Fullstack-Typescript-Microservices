import { Publisher, Subjects, UserUpdated } from "@kmevents/common";

export class UserUpdatedPublisher extends Publisher<UserUpdated> {
  subject: Subjects.UserUpdated = Subjects.UserUpdated;
}
