import { FastifyReply } from "fastify";
import  ChatModel  from "../../models/chat";
export const renameChat = async function (req: any, res : FastifyReply) {
  // before check if user is admin for group
 const { chatId, chatName } = req.body;

 try {
     let chat = await ChatModel.findById(chatId);
  if (!chat) {
    res.status(404).send({message: 'chat with this id not found'}) ;
  }
  //@ts-ignore
  chat.chatName = chatName;
  await chat!.save(); 
  res.status(200).send('chatName updated successfully');
  } catch (error) {
   return console.error();
  }
};
