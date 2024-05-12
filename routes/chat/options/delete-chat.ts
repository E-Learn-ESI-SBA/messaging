import { FastifyInstance } from "fastify";

export const deleteChatOpts = (handler : any, fastify: FastifyInstance) => ({
  schema: {
  params: { chatId: { type: "string" } }
  },
  handler: handler,
});