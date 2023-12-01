import mongoose from 'mongoose';
import { IRole } from '../../interfaces';

const UserSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        firstName: String,
        lastName: String,
        profileImgUrl: String,
        email: String,
        role:{
            type: String,
            enum: Object.values(IRole),
        },
    },
    { timestamps: true }
);
const User = mongoose.model('User', UserSchema);

export { User };
