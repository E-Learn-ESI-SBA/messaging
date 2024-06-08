import MessageModel from "../models/message.js";
import mongoose from "mongoose";
import {v4 as uuid4} from "uuid";
import {UserClaims} from "../types/config.js";
import UserModel from "../models/user.js";
import {writeFile} from "node:fs"
import {createHash } from "node:crypto"
export  class MessageService {
    public static  createMessage() {}
    public static  deleteMessage() {}
    public static  editMessage() {}
    public static  getMessages() {}
    public static async uploadFile(file:File, userId:string ) {
        console.log("Uploading file");
        const session = await  mongoose.startSession()
        session.startTransaction({
            readConcern: { level: 'snapshot' },
            writeConcern: { w: 'majority' }
        })
        try {
            // create hash file name


            const fileUrl = `${uuid4()}-${file.name}`
            const hashFile = createHash("sha256",{
                encoding:"hex",
            }).update(fileUrl).digest("hex");

            // save file in /storage/files
            const rootDir = process.cwd();
            const user = await UserModel.findById(userId).exec();
            // Save the file in the
            const filePath = `${rootDir}/storage/files/${hashFile}.${file.type.split("/")[1]}`;

            if (!user) {
                throw new Error("User not found");
            }
            await session.withTransaction(async () => {

                // ts err on file type
                // solution: cast file to accept the type

                const fileBuffer =await file.arrayBuffer()
                await new Promise<string>((resolve, reject) => {
                    writeFile(filePath, Buffer.from(new Uint8Array(fileBuffer)) , (err) => {
                        if (err) {
                            reject(err);
                            session.abortTransaction();
                        }
                        resolve(filePath);
                        MessageModel.create({
                            text:"",
                            file: {
                                url: fileUrl,
                                type: file.type,
                                name: file.name,
                            },
                            sender: user,
                        })
                    })
                })
            })

            session.commitTransaction()
        } catch (error) {
            session.abortTransaction()
            console.log(error);
        }
        finally
        {
            session.endSession();
        }
    }
}