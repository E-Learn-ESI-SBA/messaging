import MessageModel from "../../models/message";
export const deleteMessage = async function (req: any, res: any) {
  try {
    let message = await MessageModel.findById(req.params.messageId);
    if (!message) {
      res.status(404).send({ message: "message with this id not found" });
    }
    await message!.deleteOne();
    res.status(200).send({ message: "message deleted successfully" });
  } catch (error) {
    return error;
  }
};
