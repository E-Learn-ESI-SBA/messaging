import { FastifyInstance } from "fastify";

export const updateUserOpts = (handler:any, fastify : FastifyInstance) => ({
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            avatar: { type: "string" },
          },
        },
        params: { userId: { type: "string" } }
      },
  handler: handler,
});
