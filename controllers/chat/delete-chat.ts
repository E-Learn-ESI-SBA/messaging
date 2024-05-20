import { FastifyReply } from "fastify";
import  ChatModel  from "../../models/chat";
export const deleteChat = async function (req: any, res : FastifyReply) {
  try {
  //first check if user is admin  
  let message = await ChatModel.findById(req.params.chatId);
  if (!message) {
    res.status(404).send({message: 'chat with this id not found'}) ;
  }
  await message!.deleteOne();
    res.status(200).send({message: 'chat deleted successfully'});
  } catch (error) {
    return error
  }
};
