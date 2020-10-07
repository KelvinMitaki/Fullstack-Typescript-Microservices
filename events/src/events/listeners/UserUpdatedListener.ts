import { Listener, Subjects, UserUpdated } from "@kmevents/common";
import { Message } from "node-nats-streaming";
import { User } from "../../models/User";
import { queueGroupName } from "./queueGroupName";

export class UserUpdatedListener extends Listener<UserUpdated> {
  protected subject: Subjects.UserUpdated = Subjects.UserUpdated;
  protected queueGroupName = queueGroupName;
  protected async onMessage(data: UserUpdated["data"], msg: Message) {
    const user = await User.findById(data._id);
    if (!user) {
      throw new Error("No user with that id");
    }

    user.name = data.name;
    user.photos = data.photos;
    await user.save();
    msg.ack();
  }
}
