import { FastifyReply } from "fastify";
import  ChatModel  from "../../models/message";
export const getUserChats = async function (req: any, res : FastifyReply) {
  try {
    // ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
  await ChatModel.find({ users: { $elemMatch: { $eq: "663ac9728cdc7aa61f324b17" } } })
      .select("-admin -users -createdAt") 
      .sort({ updatedAt: -1 })
      .populate("latestMessage","-chat -createdAt")
      .then(async (results) => {
        //@ts-ignore
        results = await UserModel.populate(results, {
          path: "latestMessage.sender",
          select: "name avatar",
        });
        res.status(200).send(results);
      })
  } catch (error) {
    res.status(400);
    return error
  }
};
