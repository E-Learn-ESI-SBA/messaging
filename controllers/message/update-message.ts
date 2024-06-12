import MessageModel from "../../models/message.js";
export const updateMessage = async function (req: any, res: any) {
  const { text } = req.body as {
    text: string;
  };
  try {
    let message = await MessageModel.findById(req.params.messageId);
    if (!message) {
      res.status(404).send({ message: "message with this id not found" });
    }
    message!.text = text;
    await message!.save();
    res.status(200).send("message updated successfully");
  } catch (error) {
    return console.error();
  }
};
