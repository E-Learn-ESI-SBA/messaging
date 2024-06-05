
import { FastifyInstance } from 'fastify';
import { usersRoutes } from './users/index.js';
import { messagePlugin } from './message/index.js';
import { chatRoutes } from './chat/index.js';
export const setFastifyRoutes = function (fastify: FastifyInstance) {
  fastify.get("/", (_, res) => {
    res.send(true);
  });
  fastify.register(usersRoutes, { prefix: "/users" });
  fastify.register(messagePlugin, { prefix: "/messages" });
  fastify.register(chatRoutes, { prefix: "/chats" });
};