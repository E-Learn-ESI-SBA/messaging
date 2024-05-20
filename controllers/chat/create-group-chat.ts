import { FastifyReply } from "fastify";
import  ChatModel  from "../../models/chat";
export const createGroupChat = async function (req: any, res : FastifyReply) {
        let users = req.body.users;

  if (users.length < 2) {
    return res
      .status(400)
      .send("must be more than 2 users");
  }
   users.push(req.user);
  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.chatName,
      users: users,
      isGroup: true,
      admin: req.body.admin,
      avatar: req.body.avatar
    });

    const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
      .populate("users")
      .populate("admin");

    res.status(200).send(fullGroupChat);
  } catch (error) {
    res.status(400);
    return error
  }
};
