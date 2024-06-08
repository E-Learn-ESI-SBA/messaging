import {UserClaims} from "../types/config.js";
import {Message} from "../models/message.js";

interface IMessage {
    content: string;
    sender: UserClaims;
    room: string;
    timestamp?: number;
}
interface Upload {
    data:File
}
interface ServerToClientEvents {
    message: (message: IMessage) => void;
    error: (message: IMessage) => void;
    ping: () => void;
    pong: () => void;
    broadcast: (room: string, message: IMessage) => void;
    sendOnlineUsers:(room:string) => UserClaims[];
    newChat: (room: string) => void;
}

interface ClientToServerEvents {
    message: (message: IMessage) => void;
    ping: () => void;
    subscribe: (topic: string) => void;
    unsubscribe: (topic: string) => void;
    join: (room: string) => void;
    leave: (room: string, userId:string) => void;
    broadcast: (room: string, message: IMessage) => void;
    upload: (upload: Upload) => void;
    getFiles: (room: string) => Promise<Message[]>
}

interface InterServerEvents {
    ping: () => void;

}

interface SocketData {
    user: UserClaims;
}
export {ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData, IMessage};