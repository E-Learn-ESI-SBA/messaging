import { FastifyInstance } from "fastify";

export const oneToOneOpts = (handler : any, fastify: FastifyInstance) => ({
      schema: {
        params: { userId: { type: "string" } }
      },
  handler: handler,
});