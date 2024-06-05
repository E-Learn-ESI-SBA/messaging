import {
  getModelForClass,
  modelOptions,
  Plugins,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.js";
import autopopulate from "mongoose-autopopulate";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@Plugins(autopopulate as any)
export class Message {
  @prop({ ref: () => User })
  sender: Ref<User>;
  @prop({ trim: true, maxlength: 250, required: false })
  text: string;
  @prop()
  file: {
    url: string;
    size: string;
    ext: string;
  };
}

const MessageModel = getModelForClass(Message);
export default MessageModel;
