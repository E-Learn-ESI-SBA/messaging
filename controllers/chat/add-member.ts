import { FastifyReply } from "fastify";
import  ChatModel  from "../../models/message";
export const addMember = async function (req: any, res : FastifyReply) {
  try {
  const { chatId, userId } = req.body as {chatId : string, userId : string } ;

  // check if the requester is admin

  const added = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    }
  )

  if (!added) {
    res.status(404).send({message : "Chat Not Found" }) 
  } else {
    res.status(200).send({message : "member added successfully" });
  } 
  } catch (error) {
    return error
  }
};
