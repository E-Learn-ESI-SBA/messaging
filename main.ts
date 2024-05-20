import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import mongoose from 'mongoose';
import { setFastifyRoutes } from "./routes";


export const fastify = Fastify();




setFastifyRoutes(fastify);

mongoose
  .connect('mongodb+srv://mfendi:FendiMohamed27@chatapp.2wl9r8k.mongodb.net/messaging?retryWrites=true&w=majority&appName=chatapp', {
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