import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserModel from '../models/user'

const userController = (fastify : FastifyInstance,options : any ,done : any ) => {
fastify.post('/',{
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            avatar: { type: "string" },
            userId: {type: "string"},
          },
          required: ["name","email","avatar","userId"],
        },
      },
    }, async function (req : any , reply: FastifyReply) {
  const { name,email,avatar,userId  }  = req.body as {name : string;email:string;avatar:string; userId:string} ;
  try {
    await UserModel.create({
    name,
    email,
    avatar,
    userId
  });

    reply.status(201).send('user created successfully');
  } catch (error) {
   reply.status(400);
    return error
  }
  });

fastify.patch('/:userId',{
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            avatar: { type: "string" },
          },
        },
        params: { userId: { type: "string" } }
      },
    }, async function (req : any, reply: FastifyReply) {
  const { name,email,avatar }  = req.body as {name : string;email:string;avatar:string} ;
  try {
   let user = await UserModel.findByIdAndUpdate(req.params.userId, { name,email,avatar },{ new: true } );
    reply.status(200).send(user);
  } catch (error) {
   reply.status(400);
    return error
  }
  });

fastify.delete('/:userId', async function (req: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) {
  try {
  let user = await UserModel.findById(req.params.userId);
  if (!user) {
    reply.status(404).send({message: 'user with this id not found'}) ;
  }
  await user!.deleteOne();
    reply.status(200).send({message: 'user deleted successfully'});
  } catch (error) {
   reply.status(400);
    return error
  }
  });

done();
}

export default userController