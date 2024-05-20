
import { FastifyInstance } from 'fastify';
import { usersRoutes } from './users';
import { messagesRoutes } from './message';
import { chatRoutes } from './chat';
export const setFastifyRoutes = function (fastify: FastifyInstance) {
  fastify.get("/", (_, res) => {
    res.send(true);
  });
  fastify.register(usersRoutes, { prefix: "/users" });
  fastify.register(messagesRoutes, { prefix: "/messages" });
  fastify.register(chatRoutes, { prefix: "/chats" });
};