
import {UserClaims} from "../../types/config.js";

export class UserHandler {
    private users: Map<string, UserClaims>;
    private rooms: Map<string, string[]>;
    constructor() {
        this.users = new Map();
    }
    getUser(id: string): UserClaims | undefined {
        return this.users.get(id);
    }
    addUser(user: UserClaims): void {
        this.users.set(user.id, user);
    }
    removeUser(id: string): void {
        this.users.delete(id);
    }
    getAllUsers(): UserClaims[] {
        return Array.from(this.users.values());
    }

    getUsersInRoom(room:string): UserClaims[] {
        return this.getAllUsers().filter(u => this.rooms.get(room)?.includes(u.id));
    }

}