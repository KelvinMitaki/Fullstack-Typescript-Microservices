import mongoose from "mongoose";

interface UserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description?: string;
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
  following?: { [key: string]: string }[];
  followers?: { [key: string]: string }[];
  photos?: string[];
  age?: number;
  interests?: string[];
}

interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description?: string;
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
  following?: { [key: string]: string }[];
  followers?: { [key: string]: string }[];
  photos?: string[];
  interests?: string[];
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
    description: {
      type: String
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
    following: {
      type: [String]
    },
    followers: {
      type: [String]
    },
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

UserSchema.statics.build = (attrs: UserAttrs): mongoose.Document => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
