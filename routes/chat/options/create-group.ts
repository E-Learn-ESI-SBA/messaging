import { FastifyInstance } from "fastify";

export const createGroupOpts = (handler : any, fastify: FastifyInstance) => ({
      schema: {
        body: {
          type: "object",
          properties: {
            chatName: { type: "string" },
            admin: { type: "string" },
            users: {
            type: "array",
            items: { type: "string" }
            },
            avatar : { type: "string" },
          },
          required: ["chatName", "admin","users"],
        },
      },
  handler: handler,
});