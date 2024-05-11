import { FastifyInstance } from "fastify";

export const addUserOpts = (handler : any, fastify: FastifyInstance) => ({
  schema: {
         body: {
         type: "object",
         properties: {
          name: { type: "string" },
          email: { type: "string" },
          avatar: { type: "string" },
          userId: {type: "string"},
          },
          required: ["name","email","avatar","userId"],
        },
  },
  handler: handler,
});