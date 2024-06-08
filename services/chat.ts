import ChatModel from "../models/chat.js";
import {v4 as uuid4} from "uuid";
import UserModel from "../models/user.js";

export class ChatService {
    public static async LeaveChat(userId: string, chatId: string) {
        return   await ChatModel.findByIdAndUpdate(chatId, {
            $pull: {users: userId}
        }).exec();

    }

    public static async AddMember(chatId: string, userId: string) {
        const added = await ChatModel.findByIdAndUpdate(chatId, {
            $push: {users: userId},
        });
    }

    public static async DeleteChat(chatId: string) {
        return await ChatModel.findByIdAndDelete(chatId).exec();

    }

    public static async CreateChat({chatName, usersIds, avatar}: {chatName: string, usersIds: string[], avatar?: string})   {
        const users = await UserModel.find({
            userId: { $in: usersIds },
        }).exec();
        if (users.length !== usersIds.length) {
            throw new Error("Invalid Users");

        }
        return await ChatModel.create({
            chatName: chatName,
            users,
            isGroup: users.length > 2,
            avatar: avatar,
            identifier: users.length > 2 ? uuid4() : users.join("-"),
        });

    }
}
