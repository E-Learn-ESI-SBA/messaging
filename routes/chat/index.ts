import { FastifyPluginAsync } from "fastify";
import {
  addMember,
  deleteChat,
  EditChat,
  getChatById,
  getChatByUserId,
  createGroupChat,
  getChats,
} from "../../controllers/chat/index.js";
import { AuthMiddleware } from "../../middleware/auth.js";
import { RbacHandler } from "../../middleware/iam.js";

export const chatRoutes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.route({
    url: "/",
    method: "POST",
    handler: createGroupChat,
    schema: {
      body: {
        type: "object",
        required: ["users", "chatName"],
        properties: {
          users: { type: "array", items: { type: "string" }, minItems: 2 },
          chatName: { type: "string", minLength: 3 },
          avatar: { type: "string" },
        },
      },
    },
    preHandler: [AuthMiddleware(fastify), RbacHandler("admin")],
  });
  fastify.route({
    url: "/:chatId",
    method: "GET",
    handler: getChatById,
    schema: {
      params: {
        type: "object",
        required: ["chatId"],
        properties: {
          chatId: { type: "string" },
        },
      },
    },
    preHandler: [AuthMiddleware(fastify)],
  });
  fastify.route({
    url: "/",
    method: "GET",
    handler: getChatByUserId,
    schema: {
      querystring: {
        type: "object",
        required: ["userId"],
        properties: {
          userId: { type: "string" },
        },
      },
    },
    preHandler: [AuthMiddleware(fastify)],
  });
  fastify.route({
    url: "/:chatId",
    method: "PUT",
    handler: EditChat,
    schema: {
      params: {
        type: "object",
        required: ["chatId"],
        properties: {
          chatId: { type: "string" },
        },
      },
      body: {
        type: "object",
        properties: {
          chatName: { type: "string", minLength: 3 },
          avatar: { type: "string" },
        },
      },
    },
    preHandler: [AuthMiddleware(fastify), RbacHandler("admin")],
  });
  fastify.route({
    url: "/:chatId/member",
    method: "POST",
    handler: addMember,
    schema: {
      params: {
        type: "object",
        required: ["chatId"],
        properties: {
          chatId: { type: "string" },
        },
      },
      body: {
        type: "object",
        required: ["userId"],
        properties: {
          userId: { type: "string" },
        },
      },
    },
    preHandler: [AuthMiddleware(fastify), RbacHandler("teacher")],
  });
  fastify.route({
    url: "/:chatId",
    method: "DELETE",
    handler: deleteChat,
    schema: {
      params: {
        type: "object",
        required: ["chatId"],
        properties: {
          chatId: { type: "string" },
        },
      },
    },
    preHandler: [AuthMiddleware(fastify), RbacHandler("admin")],
  });
  fastify.route({
    url: "/all",
    method: "GET",
    handler: getChats,
    preHandler: [AuthMiddleware(fastify), RbacHandler("admin")],
  });
};
