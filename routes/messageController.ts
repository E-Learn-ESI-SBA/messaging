import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import User from '../models/user'
import Chat from '../models/user'
import {Message} from '../models/message'
// export interface chat {
//   name: string;
//   isGroupChat : boolean;

//   year: number;
//   released: Date;
//   plot: string;
//   type: "movie" | "series";
// }


const messageController = (fastify : FastifyInstance,options : any ,done : any ) => {

fastify.get('/:roomId',async function (req: FastifyRequest<{ Params: { roomId: string } }>, reply: FastifyReply) {
   const message = fastify.mongo.db?.collection('message')
   const Room = fastify.mongo.db?.collection('room')
   const User = fastify.mongo.db?.collection('user')
  try {
    const _id = new fastify.mongo.ObjectId(req.params.roomId) 
    const chat = await Room?.findOne({ _id });
    const messages  = await message?.find({ chat: req.params.roomId }).toArray();
    if(messages) {
      for (let i = 0; i < messages.length; i++) {
      const senderId = messages[i].sender;
      const sender = await User?.findOne({ _id: senderId });
      messages[i].sender = sender;
    }
    }

   const response = {
      messages: messages,
      chat: chat
    };

    reply.send(response);
  } catch (error:any) {
    throw new Error(error.message);
  }
  });
 
  
fastify.post('/',{
      schema: {
        body: {
          type: "object",
          properties: {
            text: { type: "string" },
            chatId: { type: "string" },
          },
          required: ["text", "chatId"],
        },
      },
    }, async function (req : any , reply: FastifyReply) {
  const { text, chatId  }  = req.body;
  console.log('message',req.body)
// const Message = fastify.mongo.db?.collection('message')
  try {
  //   let message = await Message?.insertOne({
  //   sender: Object("663aba6c8cdc7aa61f324b1a") ,
  //   text: text,
  //   chat: Object(chatId),
  // });
   let message = await Message.create({
    sender: "663aba6c8cdc7aa61f324b1a" ,
    // sender: req.user._id,
    text: text,
    chat: Object(chatId),
  
  });
   console.log('mess',message)

  // message = await message.populate("sender", "name avatar");
  //   message = await message.populate("chat");
  //   message = await User.populate(message, {
  //     path: "chat.users",
  //     select: "name avatar email",
  //   });

  //   await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    reply.status(201).send(message);
  } catch (error) {
   reply.status(400);
    return error
  }
  });

fastify.put('/',{
      schema: {
        body: {
          type: "object",
          properties: {
            content: { type: "string" },
            messageId: { type: "string" },
          },
          required: ["content", "messageId"],
        },
      },
    }, async function (req: any, reply: FastifyReply) {
   const Message = fastify.mongo.db?.collection('message')
  const { content, messageId } = req.body as {
        content: string;
        messageId: string;
      };

  if (!content || !messageId) {
    console.log("missing data");
    return reply.status(400);
  }

  try {
    const message = await Message?.findOneAndUpdate(
    Object(messageId),
    {
      content: content,
    }
  );
 return  {message}
  } catch (error) {
   return console.error();
  }
  });
  
fastify.delete('/:messageId', async function (req: FastifyRequest<{ Params: { messageId: string } }>, reply: FastifyReply) {
   const Message = fastify.mongo.db?.collection('message')
   const _id = new fastify.mongo.ObjectId(req.params.messageId) 

  try {
    const message = await Message?.findOneAndDelete({_id}) 
    if(message){
  return { message : ` message with id ${_id} deleted succesfully  ` }
    }else{
      return { message : `message not found` }  
    }

  } catch (error) {
    return error
  }
  });


done();
}

export default messageController