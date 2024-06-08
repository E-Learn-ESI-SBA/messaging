import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.js";
import { Message } from "./message.js";
import autopopulate from "mongoose-autopopulate";
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})

@plugin(autopopulate as any)
export class Chat {
  @prop({ trim: true })
  chatName: string;
  @prop({ default: false })
  isGroup: Boolean;
  @prop()
  avatar: string;
  @prop({ autopopulate: true, ref: () => User })
  users: Ref<User>[];
  @prop({ autopopulate: true, ref: () => Message})
  messages: Ref<Message>[];
  @prop({unique:true})
  identifier: string;
}

const ChatModel = getModelForClass(Chat);

export default ChatModel;
