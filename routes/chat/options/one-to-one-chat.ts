import { FastifyInstance } from "fastify";

export const oneToOneOpts = (handler : any, fastify: FastifyInstance) => ({
      schema: {
        body: {
          type: "object",
          properties: {
            userId: { type: "string" },
          },
          required: ["userId"],
        },
      },
  handler: handler,
});