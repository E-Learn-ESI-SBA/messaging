import { RouteHandler } from "fastify";
import { zodValidator } from "../../middleware/zod-validator.js";
import { EditChatSchema } from "../../types/api/chat.js";
import ChatModel from "../../models/chat.js";
import { Response } from "../../dtos/response.dto.js";

export const EditChat: RouteHandler = async (req, res) => {
  try {
    const { chatId } = req.params as { chatId: string };
    const body = zodValidator(req.body, EditChatSchema);
    if (!body) {
      return res.status(400).send("Invalid Request");
    }
    const chat = await ChatModel.findByIdAndUpdate(chatId, {
      chatName: body.chatName,
      avatar: body.avatar,
    });
    const response = new Response(chat, 200, "Chat Updated");
    return res.status(200).send(response.toJSON());
  } catch (error) {}
};
