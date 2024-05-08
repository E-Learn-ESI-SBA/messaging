import { Schema, Document, mongo } from 'mongoose';
import mongoose from 'mongoose';
interface Details {
	width: number;
	height: number;
	size: number;
}

interface File {
	type: mongoose.Schema.Types.String;
	url: mongoose.Schema.Types.String;
	size: mongoose.Schema.Types.Number;
	details?: Details;
}

interface MessageTypes extends Document {
	sender: mongoose.Schema.Types.ObjectId;
	text: mongoose.Schema.Types.String;
	chatId: mongoose.Schema.Types.ObjectId;
	file?: File;
}

// interface Details {
//    width : string;
//    height: string;
//    size:string;
// }

// interface File {
//    type : string;
//    url: string;
//    size:string;
//    details ?: Details;
// }

// interface Message extends Document {
//   sender: mongoose.Schema.Types.ObjectId;
//   text: string;
//   chat:string;
//   file?: File;
// }

const MessageSchema: Schema<MessageTypes> = new Schema(
	{
		sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		text: mongoose.Schema.Types.String,
		chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
		file: {
			type: mongoose.Schema.Types.String,
			url: mongoose.Schema.Types.String,
			size: mongoose.Schema.Types.BigInt,
			details: {
				width: mongoose.Schema.Types.Number,
				height: mongoose.Schema.Types.Number,
				size: mongoose.Schema.Types.Number,
			},
		},
	},
	{
		timestamps: true,
	}
);

export const Message =
	mongoose.models.Message || mongoose.model('Message', MessageSchema);
