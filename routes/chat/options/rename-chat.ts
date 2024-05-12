import { FastifyInstance } from "fastify";

export const renameChatOpts = (handler : any, fastify: FastifyInstance) => ({
      schema: {
        body: {
          type: "object",
          properties: {
            chatId: { type: "string" },
            chatName: { type: "string" },
          },
          required: ["chatId", "chatName"],
        },
      },
  handler: handler,
});