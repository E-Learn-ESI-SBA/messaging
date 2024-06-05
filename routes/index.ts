import { FastifyInstance } from "fastify";
import { messagePlugin } from "./message/index.js";
import { chatRoutes } from "./chat/index.js";
export const routerSetter = function (fastify: FastifyInstance) {
  fastify.register(messagePlugin, { prefix: "/messages" });
  fastify.register(chatRoutes, { prefix: "/chats" });
};
