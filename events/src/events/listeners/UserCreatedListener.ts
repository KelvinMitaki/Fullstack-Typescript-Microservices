import { Listener, Subjects, UserCreated } from "@kmevents/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { User } from "../../models/User";

export class UserCreatedListener extends Listener<UserCreated> {
  protected subject: Subjects.UserCreated = Subjects.UserCreated;
  protected queueGroupName = queueGroupName;
  protected async onMessage(data: UserCreated["data"], msg: Message) {
    const user = User.build({
      _id: data._id,
      name: data.name,
      photos: data.photos
    });
    await user.save();
    msg.ack();
  }
}
