import {ClientToServerEvents, InterServerEvents, Message, ServerToClientEvents, SocketData} from "../events.js";
import {Socket} from "socket.io";
import {ChatService} from "../../services/chat.js";
import {UserHandler} from "../../services/realtime/user.js";
import {SystemUser} from "../../types/config.js";
import {MessageService} from "../../services/messages.js";
import ChatModel from "../../models/chat.js";
export const messageHandler  =  (socket : Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>, users:UserHandler) => {
    let message:Message;
    socket.on("message", (msg) => {
        message = msg;
        socket.to(message.room).emit("message", message);
    });
    socket.on("leave", async (room,userId) => {
        await ChatService.LeaveChat(userId, room);
        const msg:Message = {
            content: `${userId} has left the chat`,
            room: room,
            sender: users.getUser(userId) ?? SystemUser,
        }
        socket.to(room).emit("message",msg );
    })
    socket.on("upload", async (upload) => {
        await MessageService.uploadFile(upload.data, message.sender.id)
    })
    socket.on("getFiles",async (room) => {
            const chat =await  ChatModel.findById(room).populate("messages").exec()
            let files;
            if (!chat || !chat.messages || chat.messages.length === 0 ) {
                return []
            }
            for (let messsg :Message in  chat.messages  ) {
                const file = messsg

        }


    })

}
