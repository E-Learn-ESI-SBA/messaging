import Fastify from 'fastify'
// import messageController from './routes/messageController';
// import chatController from './routes/chatController';
// import userController from './routes/userController';
import mongoose from 'mongoose';
const fastify = Fastify();



// fastify.register(auth);
// fastify.register(messageController, {prefix: '/message' } )
// fastify.register(userController, {prefix: '/user' } )
// fastify.register(chatController, {prefix: '/room' } )




mongoose
  .connect('mongodb+srv://mfendi:FendiMohamed27@chatapp.2wl9r8k.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=chatapp', {
  })
  .then(() => {
    const PORT = 8080;
    try {
      fastify.listen(
        {
          port: PORT,
        },
        () => {
          console.log("Listening on PORT: " + PORT);
        }
      );
    } catch (error) {
      fastify.log.error(error);
    }
  })
  .catch((e) => fastify.log.error(e));