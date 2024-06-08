import { RouteHandler } from "fastify";
import { zodValidator } from "../../middleware/zod-validator.js";
import { CreateChatSchema } from "../../types/api/chat.js";
import { Response } from "../../dtos/response.dto.js";
import {ChatService} from "../../services/chat.js";

export const createGroupChat: RouteHandler = async (req, res) => {
  try {
    const body = zodValidator(req.body, CreateChatSchema);
    if (!body) {
      return res.status(400).send("Invalid Request");
    }
    const chat = ChatService.CreateChat({chatName: body.chatName, usersIds: body.users, avatar: body.avatar});
    const response = new Response(chat, 201, "Chat Created");
    return res.status(201).send(response.toJSON());
  } catch (error : any) {
    res.status(400).send(error?.message ?? "Invalid Request");
  }
};
