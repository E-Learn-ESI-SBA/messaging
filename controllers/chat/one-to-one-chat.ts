import { FastifyReply } from "fastify";
import  ChatModel  from "../../models/chat";
import UserModel from "../../models/user";
export const oneToOneChat = async function (req: any, res : FastifyReply) {
    const { userId } = req.body;
   try {
   
        let isChat = await ChatModel.find({
          isGroup: false,
          $and: [
            { users: { $elemMatch: { $eq: "664bc4f10e0d0506d19c60c7"} } },
            // { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
          ],
        })
          .populate("users")
          .populate("latestMessage");
        //@ts-ignore
        isChat = await UserModel.populate(isChat, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        
        if (isChat.length > 0) {
          res.send( {chat :  isChat[0]});
      }else {
        res.send({chat : [] , message : 'there is no chat' });
    }
}
       catch (error) {
        res.status(400);
      }
    };




