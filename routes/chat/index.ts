import { FastifyInstance } from "fastify";
import { deleteChatOpts , getUserChatsOpts,removeMemberOpts,addMemberOpts,createGroupOpts,renameChatOpts   } from "./options";
import { getUserChats,deleteChat,renameChat,removeMember,addMember,createGroupChat,oneToOneChat } from '../../controllers/chat'
import { oneToOneOpts } from "./options/one-to-one-chat";
export const chatRoutes = function (fastify: FastifyInstance, opts : any, done : any) {
  //get two users chat still not done  
  fastify.get("/:userId", oneToOneOpts(oneToOneChat, fastify));
  fastify.post("/group", createGroupOpts(createGroupChat, fastify));
  fastify.get("/", getUserChatsOpts(getUserChats, fastify));
  fastify.patch("/rename", renameChatOpts(renameChat, fastify));
  fastify.patch("/remove-member", removeMemberOpts(removeMember, fastify));
  fastify.patch("/add-member", addMemberOpts(addMember, fastify));
  fastify.delete("/:chatId", deleteChatOpts(deleteChat, fastify));
  done();
};