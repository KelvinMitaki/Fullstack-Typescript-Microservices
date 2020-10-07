import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./NatsWrapper";

const start = async (): Promise<void> => {
  try {
    if (
      !process.env.COOKIE_SECRET ||
      !process.env.MONGO_URI ||
      !process.env.JWT_KEY ||
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
      console.log("Nats connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    await mongoose.connect(process.env.MONGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log("connected to db");
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.log(error);
  }
};
start();
