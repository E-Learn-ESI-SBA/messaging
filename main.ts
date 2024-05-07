import Fastify from 'fastify'
import fastifyMongodb from '@fastify/mongodb'
import messageController from './routes/messageController';
import roomController from './routes/roomController';
const fastify = Fastify();

fastify.register(fastifyMongodb, {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  url: 'mongodb+srv://mfendi:FendiMohamed27@chatapp.2wl9r8k.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=chatapp',
})

// fastify.register(auth);
fastify.register(messageController, {prefix: '/message' } )
fastify.register(roomController, {prefix: '/room' } )


fastify.get('/user/:id', async function (req:any, reply) {
  // Or this.mongo.client.db('mydb').collection('users')
  const users = fastify.mongo.db?.collection('users')


  // if the id is an ObjectId format, you need to create a new ObjectId
  const _id = new fastify.mongo.ObjectId(req.params.id) 
  try {
    const user = await users?.findOne({_id})
    console.log('users',user,_id)
    return user
  } catch (err) {
    return err
  }
})


interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}

interface IReply {
  200: { success: boolean };
  302: { url: string };
  '4xx': { error: string };
}

fastify.get<{
  Querystring: IQuerystring,
  Headers: IHeaders,
  Reply: IReply
}>('/auth', {
  preValidation: (request, reply, done) => {
    const { username, password } = request.query
    done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
  }
}, async (request, reply) => {
  const { username, password } = request.query
  const customerHeader = request.headers['h-Custom']
  // do something with request data
  
  // Respond based on the condition
  if (true) {
    reply.code(200).send({ success: true });
  } else if (false) {
    reply.code(302).send({ url: 'someurl' });
  } else {
    reply.code(400).send({ error: 'Some error message' });
  }

})

fastify.get('/ping', async (request, reply) => {
  return 'poqg\n'
})



fastify.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`server listening at ${address}`)
})