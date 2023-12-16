import mongoose ,{ Document } from 'mongoose';
import { IRole } from '../../interfaces';

export interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  profileImgUrl: string;
  email: string;
  role: IRole;
  isBlocked: boolean;

}

const UserSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        firstName: String,
        lastName: String,
        profileImgUrl: String,
        email: String,
        role: {
            type: String,
            enum: Object.values(IRole),
        },
        isBlocked: { type: Boolean, default: true }
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
const User = mongoose.model<IUser>('User', UserSchema);

export { User };
