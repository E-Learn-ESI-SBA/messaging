import {preHandlerAsyncHookHandler, preHandlerHookHandler} from "fastify";

export const RbacHandler  = (role:"admin"|"teacher"): preHandlerHookHandler =>  {
    return (req, res) => {
        if (req.user.role !== "admin" ||  req.user.role !== role) {
            res.status(403).send("Forbidden");
        }

    }
}