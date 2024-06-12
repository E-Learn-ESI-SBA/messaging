import ChatModel from "../../models/chat.js";
import MessageModel from "../../models/message.js";
export const sendMessage = async function (req: any, res: any) {
  const { text, chatId, userId } = req.body;
  const userTokenId = "663aba6c8cdc7aa61f324b1a";
  console.log("message", req.body);
  try {
    if (chatId) {
      let message = await MessageModel.create({
        sender: userTokenId,
        // sender: req.user._id,
        text: text,
        chat: chatId,
      });
      await ChatModel.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message._id,
      });
      res.status(201).send("message created successfully");
    } else {
      let chatData = {
        isGroup: false,
        users: [userId, userTokenId],
        latestMessage: null,
        // users: [req.user._id, userId],
      };
      const createdChat = await ChatModel.create(chatData);
      console.log("tt", createdChat);
      let message = await MessageModel.create({
        sender: userTokenId,
        // sender: req.user._id,
        text: text,
        chat: createdChat._id,
      });
      const FullChat = await ChatModel.findByIdAndUpdate(
        createdChat._id,
        { latestMessage: message._id },
        { new: true },
      );
      res.status(201).send(FullChat);
    }
  } catch (error) {
    res.status(400);
    return error;
  }
};
