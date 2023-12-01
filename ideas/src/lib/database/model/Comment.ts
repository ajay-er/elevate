import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
    },
    { timestamps: true }
);
const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
