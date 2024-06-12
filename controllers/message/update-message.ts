import { MessageService } from '../../services/messages.js';
export const updateMessage = async function (req: any, res: any) {
  const { text } = req.body as {
    text: string;
  };
  const { messageId } = req.params as { messageId: string };
  try {
    const result = await MessageService.editMessage(messageId,text)
    if (!result) {
      res.status(404).send({ message: "message with this id not found" });
    }
    res.status(200).send("message updated successfully");
  } catch (error) {
    return console.error();
  }
};
