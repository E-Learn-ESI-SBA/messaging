import { FastifyInstance } from "fastify";

export const deleteUserOpts = (handler : any, fastify: FastifyInstance) => ({
  schema: {
  params: { userId: { type: "string" } }
  },
  handler: handler,
});