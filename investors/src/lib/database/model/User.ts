import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        firstName: String,
        lastName: String,
        email: String,
        profileImgUrl: String,
        role:String,
    },
    { timestamps: true }
);
const User = mongoose.model('User', UserSchema);

export { User };
