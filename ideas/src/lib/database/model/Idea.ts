import mongoose, { Document, Schema } from 'mongoose';

interface IIdea extends Document {
    user: Schema.Types.ObjectId;
    caption: string;
    image?: string;
    likes?: Schema.Types.ObjectId[];
    dislikes?: Schema.Types.ObjectId[];
    comments?: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const ideaSchema = new mongoose.Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        caption: { type: String, required: true },
        image: { type: String },
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
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

const Idea = mongoose.model<IIdea>('Idea', ideaSchema);

export { Idea, IIdea };
