import mongoose, { Schema } from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        participants: [String],
        messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    },
    { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);
export { Chat };
