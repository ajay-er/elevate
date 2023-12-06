import mongoose, { Document, Schema, model, Types } from 'mongoose';

interface IMessage extends Document {
  text: string;
  users: Types.ObjectId[];
  sender: Types.ObjectId;
  readBy: {
    user: Types.ObjectId;
    readAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        text: {
            type: String,
            required: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        readBy: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                readAt: {
                    type: Date,
                    default: null,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Message = model<IMessage>('Messages', MessageSchema);

export { Message, IMessage };
