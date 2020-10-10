import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserAttrs {
  _id: string;
  name: string;
  photos: string[];
}

interface UserDoc extends mongoose.Document {
  _id: string;
  name: string;
  photos: string[];
  version: number;
  events: mongoose.Types.ObjectId[];
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  findByIdAndVersion(data: {
    _id: string;
    version: number;
  }): Promise<UserDoc | null>;
}

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    photos: {
      type: [String]
    },
    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Event"
      }
    ]
  },
  { timestamps: true }
);

UserSchema.set("versionKey", "version");

UserSchema.plugin(updateIfCurrentPlugin);

UserSchema.statics.findByIdAndVersion = (data: {
  _id: string;
  version: number;
}) => {
  return User.findOne({ _id: data._id, version: data.version - 1 });
};

UserSchema.statics.build = (attrs: UserAttrs): mongoose.Document => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
