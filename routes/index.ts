
import { FastifyInstance } from 'fastify';
import { usersRoutes } from './users';
export const setFastifyRoutes = function (fastify: FastifyInstance) {
  fastify.get("/", (_, res) => {
    res.send(true);
  });
  fastify.register(usersRoutes, { prefix: "/users" });
};