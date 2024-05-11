import {
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from "@typegoose/typegoose";
import { User } from "./user";
import { Chat } from "./chat";

class FileDetails {
  @prop()
  width: string;

  @prop()
  height: string;

  @prop()
  size: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  }
})
export class Message {
  @prop({ ref: () => User })
  sender: Ref<User>;	

  @prop({ trim: true })
  text: string;

  @prop({ ref: 'Chat' })
  chat: Ref<Chat>;

  @prop()
  file: {
    type: string;
    url: string;
    size: string;
    details: FileDetails;
  };
}



const MessageModel = getModelForClass(Message);

export default MessageModel;
