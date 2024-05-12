import { FastifyInstance } from "fastify";

export const getUserChatsOpts = (handler : any, fastify: FastifyInstance) => ({
  handler: handler,
});