import {RouteHandler} from "fastify";
import {ChatService} from "../../services/chat.js";
export const addMember : RouteHandler= async function (req, res) {
  try {
    const { chatId, userId } = req.body as { chatId: string; userId: string };
    const added = ChatService.AddMember(chatId, userId);
    if (!added) {
      res.status(404).send({ message: "Chat Not Found" });
    } else {
      res.status(200).send({ message: "member added successfully" });
    }
  } catch (error) {
    return error;
  }
};
