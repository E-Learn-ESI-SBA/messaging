import Fastify, {FastifyPluginAsync} from 'fastify';
import mongoose from 'mongoose';
import path from "path";
import {fileURLToPath} from "node:url";
import {AutoloadPluginOptions} from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import {ConfigSchema} from "./types/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export type AppOptions = {} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {
    forceESM: true,
    routeParams: true,
};
/*
// export const fastify = Fastify({ logger: true });
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
*/

const envPath = path.join(__dirname, "..", ".env");
const app: FastifyPluginAsync<AppOptions>  = async (fastify , opts) :Promise<void>=>  {
    void fastify
        .register(fastifyEnv, {
            confKey: "config",
            schema: ConfigSchema,
            dotenv: process.env.NODE_ENV && process.env.NODE_ENV == "development" ? {
                path: envPath,
                debug: true,
            }: undefined,
        }).after(() => {
                mongoose.connect(fastify.config.MONGO_URI, {
                }).then(() => {
                    fastify.log.info("MongoDB connected");
                }).catch((e) => {
                    fastify.log.error(e);
                })
        }).after(() => {
            
        })
}