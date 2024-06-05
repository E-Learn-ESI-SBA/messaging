import { RouteHandler } from "fastify";
import ChatModel from "../../models/chat.js";

export const deleteChat: RouteHandler = async (req, replay) => {
  try {
    const { chatId } = req.params as { chatId: string };
    const result = await ChatModel.findByIdAndDelete(chatId).exec();
    if (!result) {
      return replay.status(404).send({ message: "Chat Not Found" });
    }
    replay.status(200).send({ message: "Chat Deleted" });
  } catch (error) {
    replay.status(500).send("Internal Server Error");
  }
};
