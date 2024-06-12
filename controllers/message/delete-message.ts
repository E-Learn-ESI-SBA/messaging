import { MessageService } from "../../services/messages.js";
export const deleteMessage = async function (req: any, res: any) {
  try {
    const { messageId } = req.params as { messageId: string };
    const result = await MessageService.deleteMessage(messageId)
    if (!result) {
      return res.status(404).send({ message: "Message Not Found" });
    }
    res.status(200).send({ message: "message deleted successfully" });
  } catch (error) {
    return error;
  }
};
