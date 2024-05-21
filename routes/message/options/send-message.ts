import { FastifyInstance } from "fastify";

export const sendMessageOpts = (handler : any, fastify: FastifyInstance) => ({
      schema: {
        body: {
          type: "object",
          properties: {
            text: { type: "string" },
            chatId: { type: "string" },
            userId: {type:"string"}
          },
          required: ["text", "chatId"],
        },
      },
  handler: handler,
});