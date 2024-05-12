import ChatModel from "../../models/chat";
import MessageModel  from "../../models/message";
export const sendMessage = async function (req: any, res : any) {
  const { text, chatId  }  = req.body;
  console.log('message',req.body)
  try {
   let message = await MessageModel.create({
    sender: "663aba6c8cdc7aa61f324b1a" ,
    // sender: req.user._id,
    text: text,
    chat: chatId,
  });

 await ChatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message._id });

    res.status(201).send('message created successfully');
  } catch (error) {
   res.status(400);
    return error
  }
};
