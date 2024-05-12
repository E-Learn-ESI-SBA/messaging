import { FastifyReply } from "fastify";
import  ChatModel  from "../../models/message";
export const removeMember = async function (req: any, res : FastifyReply) {
  try {
   // before check if user is admin
     const { chatId, userId } = req.body;
      const removed = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
  )

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.send({message : ` member width id = ${userId} has been deleted successfully ` });
  }
  } catch (error) {
    return error
  }
};
