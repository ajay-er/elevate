import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema(
    {   
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
    },
    { 
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true 
    }
);
const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
