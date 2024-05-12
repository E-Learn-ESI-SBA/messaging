import { sendMessageOpts, deleteMessageOpts,getMessagesOpts,updateMessageOpts } from "./options";
import { sendMessage, updateMessage, deleteMessage,getMessages } from "../../controllers/message";
import { FastifyInstance } from "fastify";

export const messagesRoutes = function (fastify: FastifyInstance, opts : any, done : any) {
  fastify.post("/", sendMessageOpts(sendMessage, fastify));
  fastify.get("/:chatId", getMessagesOpts(getMessages, fastify));
  fastify.patch("/:messageId", updateMessageOpts(updateMessage, fastify));
  fastify.delete("/:messageId", deleteMessageOpts(deleteMessage, fastify));
  done();
};