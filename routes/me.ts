const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// fastify.post('/',async function (req : any , reply: FastifyReply) {
//    const Message = fastify.mongo.db?.collection('message')
//    const Room = fastify.mongo.db?.collection('room')
//   const { content, roomId  }  = req.body;

//   var newMessage = {
//     sender: req.user._id,
//     content: content,
//     chat: roomId,
//   };

//   try {
//     var message = await Message?.insertOne(newMessage);

//    //get user data and chat data then return it

//     await Room?.findOneAndUpdate(req.body.roomId, { latestMessage: message });

//     // reply.send();
//   } catch (error) {
//    reply.status(400);
//     return error
//   }
//   });