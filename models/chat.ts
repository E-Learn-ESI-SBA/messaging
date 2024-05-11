import {
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from "@typegoose/typegoose";
import { User } from "./user";
import { Message } from "./message";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  }
})
export class Chat {
  @prop({ trim : true })
  chatName: string;

  @prop({ default : false })
  isGroup: Boolean;

  @prop()
  avatar: string;

  @prop({ ref: () => User })
  users: Ref<User>[];

  @prop({ ref: () => User })
  admin: Ref<User>;

  @prop({ ref: () => Message })
  latestMessage: Ref<Message>;

}

const ChatModel = getModelForClass(Chat);

export default ChatModel;