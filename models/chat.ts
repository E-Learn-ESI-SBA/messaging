import { Schema, Document, model, models, Model } from "mongoose";
import mongoose from "mongoose"
interface Chat extends Document {
  chatName: string;
  isGroup: boolean;
  avatar?: string;
  users : string[];
  latestMessage : string;
  admin : string;
}

const ChatSchema: Schema<Chat> = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroup: { type: Boolean, default: false },
    avatar : {type : String},
    users: [{ type: mongoose.Schema.Types.userId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    admin: { type: mongoose.Schema.Types.userId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = models.Chat || model("Chat", UserSchema)

export default Chat

