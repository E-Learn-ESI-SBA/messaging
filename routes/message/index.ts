import { sendMessage, updateMessage, deleteMessage,getMessages } from "../../controllers/message/index.js";
import { FastifyPluginAsync, FastifyPluginOptions} from "fastify";
export const messagePlugin:  FastifyPluginAsync = async (fastify, opts:FastifyPluginOptions) => {
    fastify.route({
      url: "/",
      method:"POST",
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
      handler:sendMessage
    })
  fastify.route({
    url: "/:chatId",
    method:"GET",
    schema: {
      params: {
        type: "object",
        properties: {
          chatId: { type: "string" },
        },
        required: ["chatId"],
      },
    },
    handler:getMessages
  })
    fastify.route({
        url: "/:messageId",
        method:"PATCH",
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
        handler:updateMessage
    })
    fastify.route({
        url: "/:messageId",
        method:"DELETE",
        schema: {
        params: {
            type: "object",
            properties: {
            messageId: { type: "string" },
            },
            required: ["messageId"],
        },
        },
        handler:deleteMessage
    })
}