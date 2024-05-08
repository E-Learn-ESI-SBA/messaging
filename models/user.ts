import { Schema, Document, model, models, Model } from "mongoose";
import mongoose from "mongoose"
interface User extends Document {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
}

const UserSchema: Schema<User> = new Schema(
  {
    userId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const User: Model<User> = models.User || model<User>("User", UserSchema);

export default User;
