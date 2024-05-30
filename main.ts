import Fastify from 'fastify';
import mongoose from 'mongoose';
import { setFastifyRoutes } from "./routes";
import { setFastifyCors } from './config/cors';

export const fastify = Fastify();

setFastifyCors(fastify);
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
