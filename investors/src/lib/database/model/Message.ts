import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true ,unique:true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);
const Message = mongoose.model('Message', messageSchema);

export { Message };
