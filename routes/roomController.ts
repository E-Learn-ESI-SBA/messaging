import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import messageController from "./messageController";


const roomController = (fastify : FastifyInstance,options : any ,done : any ) => {


 fastify.post('/', async (req: any , res: FastifyReply) => {
    try {
      const { userId } = req.body;

  const Room = fastify.mongo.db?.collection('room')
      const isRoom = await Room?.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })

      // and get users data and latest message and his sender data

      if (isRoom) {
        return res.send(isRoom);
      } else {
        const roomData = {
          isGroupChat: false,
          users: [req.user._id, userId],
        };

        const createdChat = await Room?.insertOne(roomData)
       // return users data of chat and then created chat

        // return res.status(200).send();
      }
    } catch (error) {
      res.status(400);
      return error
    }
  });


  

fastify.get('/', async function (req:any,reply){
    const room = fastify.mongo.db?.collection('room')
  try {
    room?.find({ users: { $elemMatch: { $eq: req.user._id } } }).sort({ updatedAt: -1 })

    //get users data also latest message then get latest message sender data
    reply.status(200).send(room);
  } catch (error) {
    reply.status(400);
    return error
  }
} )


fastify.post('/group', {
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            admin: { type: "string" },
            users: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["name", "admin","users"],
        },
      },
    }, async function (req:any,reply){
    const Room = fastify.mongo.db?.collection('room')

  try {
    const group = await Room?.insertOne({
      name: req.body.name,
      isGroupChat: true,
      users: req.users,
      latestMessage: null,
      admin: req.admin,
    });

 
   //get users data also admin and return group

    // reply.status(200).send();
  } catch (error) {
    return error
  }
} )

fastify.put('/rename', {
      schema: {
        body: {
          type: "object",
          properties: {
            roomId: { type: "string" },
            name: { type: "string" },
          },
          required: ["roomId", "name"],
        },
      },
    }, async function (req:any,reply){
    const room = fastify.mongo.db?.collection('room')

  const { roomId, name } = req.body;

  const updatedChat = await room?.findOneAndUpdate(
    roomId,
    {
      name: name,
    },
  )

  // also fetch users info then send final data

  if (!updatedChat) {
    reply.status(404).send({message : 'did not find chat' })
  } else {
    reply.status(200).send(updatedChat);
  }
} )

fastify.put('/remove',
  {
      schema: {
        body: {
          type: "object",
          properties: {
            roomId: { type: "string" },
            userId: { type: "string" },
          },
          required: ["roomId", "userId"],
        },
      },
    },
async function (req:any,reply){
    const Room = fastify.mongo.db?.collection('room')
 const { roomId, userId } = req.body;

   // check if he is admin of the group

  const removed = await Room?.findOneAndUpdate(
    roomId,
    {
      $pull: { users: userId },
    },
  )

  // also fetch users info then send final data

  if (!removed) {
    reply.status(404).send({message : 'did not find room' })
  } else {
    reply.send(removed);
  }
} )

fastify.put('/add',async function (req:any,reply){
    const Room = fastify.mongo.db?.collection('room')
  const { roomId, userId } = req.body;

  // check if he  is admin of the group
  
const room = await Room?.findOneAndUpdate(
    roomId,
    {
      $push: { users: userId },
    },
  )
   // also fetch users info then send final data

  if (!room) {
    reply.status(404);
     console.log('no room with this id')
  } else {
    reply.send(room);
  }
} )


// fastify.post('/group', async function (req,reply){
//     const room = fastify.mongo.db?.collection('room')

//     try {
//       const chat = await room?.insertOne({
//   name: "Group 8 Chat",
//   isGroupChat: true,
//   users: [
//    "59b99db4cfa9a34dcd7885b6",
//     "59b99db6cfa9a34dcd7885bb",
//     "59b99db6cfa9a34dcd7885bc",
//   ],
//   latestMessage: null,
//   groupAdmin: "59b99db4cfa9a34dcd7885b6" ,
//       })
//       console.log('usersl',chat)
//       return { message : ` room created succesfully  ` }
//     } catch (err) {
//       return err
//     }
// } )

fastify.delete('/:roomId',
async function (req: FastifyRequest<{ Params: { roomId: string } }>, reply: FastifyReply) {
    const Room = fastify.mongo.db?.collection('room')

    const _id = new fastify.mongo.ObjectId(req.params.roomId) 
    try {
      const room = await Room?.findOneAndDelete({_id})
      if(room) {
      return reply.status(200).send({message:  ` room with id ${_id} deleted succesfully  ` }) 
      }else{
          return reply.status(200).send({message:  ` room not found` }) 
      }
    } catch (err) {
      return err
    }
} )

done();
}

export default roomController