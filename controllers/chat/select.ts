import { RouteHandler } from "fastify";
import ChatModel from "../../models/chat.js";
import { Response } from "../../dtos/response.dto.js";

export const getChatByUserId: RouteHandler = async (req, replay) => {
  try {
    const userID = req.user.id;

    const chat = await ChatModel.find({
      users: { $elemMatch: { $eq: userID } },
    })
      .populate({
        path: "messages",
        options: {
          sort: { timestamp: -1 },
          limit: 1,
        },
      })
      .sort({ "messages.timestamp": -1 })
      .exec();
    const response = new Response(chat, 200, "Chat Found");
    return replay.status(200).send(response.toJSON());
  } catch (error) {
    return replay.status(500).send("Internal Server Error");
  }
};

export const getChatById: RouteHandler = async (req, replay) => {
  try {
    const { chatId } = req.params as { chatId: string };
    const chat = await ChatModel.findById(chatId)
      .populate({
        path: "messages",
        options: {
          sort: { timestamp: -1 },
          populate: {
            path: "sender",
          },
        },
      })
      .exec();
    if (!chat) {
      return replay.status(404).send({ message: "Chat Not Found" });
    }
    const response = new Response(chat, 200, "Chat Found");
    return replay.status(200).send(response.toJSON());
  } catch (error) {
    return replay.status(500).send("Internal Server Error");
  }
};

export const getChats: RouteHandler = async (req, replay) => {
  try {
    const chats = await ChatModel.find().exec();
    const response = new Response(chats, 200, "Chats Found");
    return replay.status(200).send(response.toJSON());
  } catch (error) {
    return replay.status(500).send("Internal Server Error");
  }
};
