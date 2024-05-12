import { FastifyInstance } from "fastify";

export const deleteMessageOpts = (handler : any, fastify: FastifyInstance) => ({
  schema: {
  params: { messageId: { type: "string" } }
  },
  handler: handler,
});