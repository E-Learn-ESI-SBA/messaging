import { RouteHandler } from "fastify";
import { zodValidator } from "../../middleware/zod-validator.js";
import { CreateChatSchema } from "../../types/api/chat.js";
import ChatModel from "../../models/chat.js";
import UserModel from "../../models/user.js";
import { Response } from "../../dtos/response.dto.js";

export const createGroupChat: RouteHandler = async (req, res) => {
  try {
    const body = zodValidator(req.body, CreateChatSchema);
    if (!body) {
      return res.status(400).send("Invalid Request");
    }
    body.users.push(req.user.id);
    const users = await UserModel.find({
      userId: { $in: body.users },
    }).exec();
    if (users.length !== body.users.length) {
      return res.status(400).send("Invalid Users");
    }
    const chat = await ChatModel.create({
      chatName: body.chatName,
      users,
      isGroup: body.users.length > 2,
      avatar: body.avatar,
    });
    const response = new Response(chat, 201, "Chat Created");
    return res.status(201).send(response.toJSON());
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
