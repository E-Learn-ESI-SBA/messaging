import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

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
            content: { type: "string" },
            roomId: { type: "string" },
          },
          required: ["content", "roomId"],
        },
      },
    }, async function (req : any , reply: FastifyReply) {
   const Message = fastify.mongo.db?.collection('message')
   const Room = fastify.mongo.db?.collection('room')
  const { content, roomId  }  = req.body;

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: roomId,
  };

  try {
    var message = await Message?.insertOne(newMessage);

   //get user data and chat data then return it

    await Room?.findOneAndUpdate(req.body.roomId, { latestMessage: message });

    // reply.send();
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