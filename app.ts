import Fastify, { FastifyPluginAsync } from "fastify";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "node:url";
import { AutoloadPluginOptions } from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import { ConfigSchema } from "./types/config.js";
import { routerSetter } from "./routes/index.js";
import KafkaPlugin from "./plugins/kafka.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export type AppOptions = {} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {
  forceESM: true,
  routeParams: true,
};

const envPath = path.join(__dirname, "..", ".env");
const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  void fastify
    .register(fastifyEnv, {
      confKey: "config",
      schema: ConfigSchema,
      dotenv:
        process.env.NODE_ENV && process.env.NODE_ENV == "development"
          ? {
              path: envPath,
              debug: true,
            }
          : undefined,
    })
    .after(async () => {
      await mongoose.connect(fastify.config.MONGO_URI, {});
      fastify.log.info("Connected to MongoDB");
    })
    .after(() => {
      fastify.register(KafkaPlugin, {
        broker: fastify.config.KAFKA_BROKER,
        groupId: fastify.config.KAFKA_GROUP_ID,
        clientId: "message-service",
      });
    })
    .after(() => {
      fastify.register(routerSetter);
    });
};

const fastify = Fastify({
  logger: true,
});
// Env

app(fastify, {
  ...options,
});

export default app;
export { app, options };
