import { Schema, Document, model, models, Model} from "mongoose";
import mongoose from "mongoose"
interface Details {
   width : any;
   height: any;
   size: any; 
}

interface File {
   type : any;
   url: any;
   size: any; 
   details ?: Details;
}

interface MessageTypes extends Document {
  sender: mongoose.Schema.Types.ObjectId;
  text: any;
  chat:any;
  file?: File;
}

// interface Details {
//    width : string;
//    height: string;
//    size:string; 
// }

// interface File {
//    type : string;
//    url: string;
//    size:string; 
//    details ?: Details;
// }

// interface Message extends Document {
//   sender: mongoose.Schema.Types.ObjectId;
//   text: string;
//   chat:string;
//   file?: File;
// }


const MessageSchema : Schema<MessageTypes> = new Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId , ref: "User" },
    text: String,
    chat:{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    file: {
      type: String,
      url:String,
      size: String,
      details: {
      width: String,
      height:  String,
      size:  String,
      }
    }
  },
{
  timestamps: true
}
);

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);



