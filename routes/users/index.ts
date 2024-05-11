import { addUserOpts, updateUserOpts,deleteUserOpts } from "./options";
import { addUser, updateUser, deleteUser } from "../../controllers/user";
import { FastifyInstance } from "fastify";

export const usersRoutes = function (fastify: FastifyInstance, opts : any, done : any) {
  fastify.post("/", addUserOpts(addUser, fastify));
  fastify.patch("/:userId", updateUserOpts(updateUser, fastify));
  fastify.delete("/:userId", deleteUserOpts(deleteUser, fastify));
  done();
};