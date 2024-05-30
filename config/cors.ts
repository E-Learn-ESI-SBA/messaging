  import FastifyCors from "@fastify/cors";
  import { FastifyInstance } from "fastify";

  export const setFastifyCors = function (fastify:FastifyInstance) {
    fastify.register(FastifyCors, {
      origin: [
        "https://admin-front-woad.vercel.app",
        "https://staff-front-two.vercel.app",
      ],
    });
  };
