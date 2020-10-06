import mongoose from "mongoose";
import { app } from "./app";

const start = async (): Promise<void> => {
  try {
    if (!process.env.COOKIE_SECRET || !process.env.MONGO_URI) {
      throw new Error("Env variables must be provided");
    }
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
