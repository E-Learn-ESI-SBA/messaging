import { FastifyInstance } from "fastify";

export const updateMessageOpts = (handler:any, fastify : FastifyInstance) => ({
      schema: {
        body: {
          type: "object",
          properties: {
            text: { type: "string" },
          },
          required: ["text"],
        },
          params: { messageId: { type: "string" } }
      },
  handler: handler,
});
