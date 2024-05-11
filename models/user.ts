import {
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
@modelOptions({
  schemaOptions: {
    timestamps: true,
  }
})
export class User {
  
  @prop({ unique: true,required:true})
  userId: string;	

  @prop({ required : true })
  name: string;

  @prop({ required: true,unique: true })
  email: string;

  @prop()
  avatar: string;

}

const UserModel = getModelForClass(User);

export default UserModel;