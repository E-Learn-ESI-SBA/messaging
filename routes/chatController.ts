import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import  UserModel  from "../models/user";
import  ChatModel  from "../models/chat";
const chatController = (fastify : FastifyInstance,options : any ,done : any ) => {
  
//work
fastify.get('/', async function (req:any,reply){
 try {
    // ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
  await ChatModel.find({ users: { $elemMatch: { $eq: "663ac9728cdc7aa61f324b17" } } })
      .select("-admin -users -createdAt") 
      .sort({ updatedAt: -1 })
      .populate("latestMessage","-chat -createdAt")
      .then(async (results) => {
        //@ts-ignore
        results = await UserModel.populate(results, {
          path: "latestMessage.sender",
          select: "name avatar",
        });
        reply.status(200).send(results);
      })
  } catch (error) {
    reply.status(400);
    return error
  }
} )

//work 

fastify.post('/group', {
      schema: {
        body: {
          type: "object",
          properties: {
            chatName: { type: "string" },
            admin: { type: "string" },
            users: {
            type: "array",
            items: { type: "string" }
            },
            avatar : { type: "string" },
          },
          required: ["chatName", "admin","users"],
        },
      },
    }, async function (req:any,reply){
        var users = req.body.users;

  if (users.length < 2) {
    return reply
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
   users.push(req.user);
  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.chatName,
      users: users,
      isGroupChat: true,
      admin: req.body.admin,
      avatar: req.body.avatar
    });

    const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
      .populate("users")
      .populate("admin");

    reply.status(200).send(fullGroupChat);
  } catch (error) {
    reply.status(400);
    return error
  }
} )

//work

fastify.patch('/rename', {
      schema: {
        body: {
          type: "object",
          properties: {
            chatId: { type: "string" },
            chatName: { type: "string" },
          },
          required: ["chatId", "chatName"],
        },
      },
    }, async function (req:any,reply){
  // before check if he is admin
 const { chatId, chatName } = req.body;

 try {
     let chat = await ChatModel.findById(chatId);
  if (!chat) {
    reply.status(404).send({message: 'chat with this id not found'}) ;
  }
  chat!.chatName = chatName;
  await chat!.save(); 
  reply.status(200).send('chatName updated successfully');
  } catch (error) {
   return console.error();
  }
} )


//work

fastify.patch('/remove',
  {
      schema: {
        body: {
          type: "object",
          properties: {
            chatId: { type: "string" },
            userId: { type: "string" },
          },
          required: ["chatId", "userId"],
        },
      },
    },
async function (req:any,reply){
   // before check if he is admin
     const { chatId, userId } = req.body;
      const removed = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
  )

  if (!removed) {
    reply.status(404);
    throw new Error("Chat Not Found");
  } else {
    reply.send({message : ` member width id = ${userId} has been deleted successfully ` });
  }

} )

//work 

fastify.patch('/add',{
      schema: {
        body: {
          type: "object",
          properties: {
            chatId: { type: "string" },
            userId: { type: "string" },
          },
          required: ["chatId", "userId"],
        },
      },
    },async function (req:any,reply){
  const { chatId, userId } = req.body as {chatId : string, userId : string } ;

  // check if the requester is admin

  const added = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    }
  )

  if (!added) {
    reply.status(404).send({message : "Chat Not Found" }) 
  } else {
    reply.status(200).send({message : "member added successfully" });
  } 

} )

//work

fastify.delete('/:chatId',  {
      schema: {
      params: { chatId: { type: "string" } }
      },
    },
async function (req: FastifyRequest<{ Params: { chatId: string } }>, reply: FastifyReply) {
  //check if admin
  try {
  let chat = await ChatModel.findById(req.params.chatId);
  if (!chat) {
    reply.status(404).send({message: 'chat with this id not found'}) ;
  }
  await chat!.deleteOne();
    reply.status(200).send({message: 'chat deleted successfully'});
  } catch (error) {
    return error
  }
} )

done();
}

export default chatController