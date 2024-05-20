import { FastifyReply } from "fastify";
import  ChatModel  from "../../models/chat";
import UserModel from "../../models/user";
export const oneToOneChat = async function (req: any, res : FastifyReply) {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.status(400);
    }
    
    var isChat = await ChatModel.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: "664bc4f10e0d0506d19c60c7"} } },
        // { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    //@ts-ignore
    isChat = await UserModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        isGroup: false,
        users: ["664bc4f10e0d0506d19c60c7", userId],
      };
    
      try {
        const createdChat = await ChatModel.create(chatData);
        const FullChat = await ChatModel.findOne({ _id: createdChat._id }).populate(
          "users",
        );
        res.status(201).send(FullChat);
      } catch (error) {
        res.status(400);
      }
    }
};




