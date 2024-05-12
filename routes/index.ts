
import { FastifyInstance } from 'fastify';
import { usersRoutes } from './users';
import { messagesRoutes } from './message';
export const setFastifyRoutes = function (fastify: FastifyInstance) {
  fastify.get("/", (_, res) => {
    res.send(true);
  });
  fastify.register(usersRoutes, { prefix: "/users" });
  fastify.register(usersRoutes, { prefix: "/messages" });
};