import mongoose from "mongoose";

interface UserAttrs {
  _id: string;
  name: string;
  profilePhoto: string;
}

interface UserDoc extends mongoose.Document {
  _id: string;
  name: string;
  profilePhoto: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
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
    profilePhoto: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

UserSchema.statics.build = (attrs: UserAttrs): mongoose.Document => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
