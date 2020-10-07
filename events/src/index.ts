import mongoose from "mongoose";
import { app } from "./app";
import { UserCreatedListener } from "./events/listeners/UserCreatedListener";
import { UserUpdatedListener } from "./events/listeners/UserUpdatedListener";
import { natsWrapper } from "./NatsWrapper";

const start = async (): Promise<void> => {
  try {
    if (
      !process.env.COOKIE_SECRET ||
      !process.env.MONGO_URI ||
      !process.env.NATS_CLUSTER_ID ||
      !process.env.NATS_CLIENT_ID ||
      !process.env.NATS_URL
    ) {
      throw new Error("Env variables must be provided");
    }
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("Nats Connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    new UserCreatedListener(natsWrapper.client).listen();
    new UserUpdatedListener(natsWrapper.client).listen();
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("connected to db");
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.log(error);
  }
};
start();
