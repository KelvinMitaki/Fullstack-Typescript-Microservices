import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  knownAs?: string;
  gender?: string;
  birthDate?: Date;
  homeTown?: string;
  status?: string;
  aboutMe?: string;
  hobbies?: string[];
  occupation?: string;
  originCountry?: string;
  events?: { [key: string]: string }[];
  following?: mongoose.Types.ObjectId[];
  followers?: mongoose.Types.ObjectId[];
  photos?: string[];
  age?: number;
  interests?: string[];
}

interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  knownAs?: string;
  gender?: string;
  birthDate?: Date;
  homeTown?: string;
  status?: string;
  aboutMe?: string;
  hobbies?: string[];
  occupation?: string;
  originCountry?: string;
  events?: { [key: string]: string }[];
  following?: mongoose.Types.ObjectId[];
  followers?: mongoose.Types.ObjectId[];
  photos?: string[];
  interests?: string[];
  version: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    knownAs: {
      type: String
    },
    gender: {
      type: String
    },
    birthDate: {
      type: Date
    },
    homeTown: {
      type: String
    },
    status: {
      type: String
    },
    aboutMe: {
      type: String
    },
    hobbies: {
      type: [String]
    },
    occupation: {
      type: String
    },
    originCountry: {
      type: String
    },
    events: {
      type: [String]
    },
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ],
    photos: {
      type: [String]
    },
    interests: {
      type: [String]
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      }
    }
  }
);

UserSchema.set("versionKey", "version");

UserSchema.plugin(updateIfCurrentPlugin);

UserSchema.statics.build = (attrs: UserAttrs): mongoose.Document => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
