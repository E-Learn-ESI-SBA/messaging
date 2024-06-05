import MessageModel from "../../models/message";
export const getMessages = async function (req: any, res: any) {
  try {
    const messages = await MessageModel.find({
      chat: req.params.chatId,
    }).populate("sender", "name avatar email");

    res.status(200).send(messages);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
