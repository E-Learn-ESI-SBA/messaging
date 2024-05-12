import { FastifyInstance } from "fastify";

export const addMemberOpts = (handler : any, fastify: FastifyInstance) => ({
      schema: {
        body: {
          type: "object",
          properties: {
            chatId: { type: "string" },
            userId: { type: "string" },
          },
          required: ["chatId", "userId"],
        },
      },
  handler: handler,
});