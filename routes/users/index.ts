import { addUser, updateUser, deleteUser } from "../../controllers/user/index.js";
import { FastifyInstance } from "fastify";
import {addUserOpts, deleteUserOpts, updateUserOpts} from "./options/index.js";

export const usersRoutes = function (fastify: FastifyInstance, opts : any, done : any) {
  fastify.post("/", addUserOpts(addUser, fastify));
  fastify.patch("/:userId", updateUserOpts(updateUser, fastify));
  fastify.delete("/:userId", deleteUserOpts(deleteUser, fastify));
  done();
};