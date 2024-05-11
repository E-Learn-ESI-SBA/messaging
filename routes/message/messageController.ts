import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ChatModel from '../../models/chat'
import MessageModel from '../../models/message'


const messageController = (fastify : FastifyInstance,options : any ,done : any ) => {
//work

fastify.get('/:chatId',async function (req: FastifyRequest<{ Params: { chatId: string } }>, reply: FastifyReply) {

  try {
     const messages = await MessageModel.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")

    reply.status(200).send(messages);
  } catch (error:any) {
    throw new Error(error.message);
  }
  });
 
 //work 
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
  try {
   let message = await MessageModel.create({
    sender: "663aba6c8cdc7aa61f324b1a" ,
    // sender: req.user._id,
    text: text,
    chat: chatId,
  });

 await ChatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message._id });

    reply.status(201).send('message created successfully');
  } catch (error) {
   reply.status(400);
    return error
  }
  });


 //work 
fastify.patch('/:messageId',{
      schema: {
        body: {
          type: "object",
          properties: {
            text: { type: "string" },
          },
          required: ["text"],
        },
          params: { messageId: { type: "string" } }
      },
    }, async function (req: any, reply: FastifyReply) {
  const {text} = req.body as {
        text: string;
      };
  try {
     let message = await MessageModel.findById(req.params.messageId);
  if (!message) {
    reply.status(404).send({message: 'message with this id not found'}) ;
  }
  message!.text = text;
  await message!.save(); 
  reply.status(200).send('message updated successfully');
  } catch (error) {
   return console.error();
  }
  });

  //work
fastify.delete('/:messageId', async function (req: FastifyRequest<{ Params: { messageId: string } }>, reply: FastifyReply) {
  try {
  let message = await MessageModel.findById(req.params.messageId);
  if (!message) {
    reply.status(404).send({message: 'message with this id not found'}) ;
  }
  await message!.deleteOne();
    reply.status(200).send({message: 'message deleted successfully'});
  } catch (error) {
    return error
  }
  });


done();
}

export default messageController