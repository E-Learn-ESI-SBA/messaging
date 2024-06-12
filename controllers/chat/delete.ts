import { RouteHandler } from "fastify";
import {ChatService} from "../../services/chat.js";

export const deleteChat: RouteHandler = async (req, replay) => {
  try {
    const { chatId } = req.params as { chatId: string };
    const result = await ChatService.DeleteChat(chatId)
    if (!result) {
      return replay.status(404).send({ message: "Chat Not Found" });
    }
    replay.status(200).send({ message: "Chat Deleted" });
  } catch (error) {
    replay.status(500).send("Internal Server Error");
  }
};


export const leaveChat: RouteHandler = async (req, replay) => {
    try {
        const { chatId } = req.params as { chatId: string };
        const result = await ChatService.LeaveChat(req.user.id, chatId)
        if (!result) {
            return replay.status(404).send({ message: "Chat Not Found" });
        }
        replay.status(200).send({ message: "Leaved Chat" });
    } catch (error) {
        replay.status(500).send("Internal Server Error");
    }
}