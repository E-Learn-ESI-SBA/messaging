import { FastifyInstance } from "fastify";

export const getMessagesOpts = (handler : any, fastify: FastifyInstance) => ({
  schema: {
  params: { chatId: { type: "string" } }
  },
  handler: handler,
});