import mongoose ,{ Document } from 'mongoose';
import { IRole, PlanType, SubscriptionStatus } from '../../interfaces';
export interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  profileImgUrl: string;
  email: string;
  role: IRole;
  isBlocked: boolean;
  subscription: Subscription;
}

interface Subscription {
    status: SubscriptionStatus;
    plan: PlanType;
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
        isBlocked: { type: Boolean, default: false },
        subscription: {
            type: {
                status: {type:String,enum:Object.values(SubscriptionStatus)},
                plan: {type:String,enum:Object.values(PlanType)},
            }
        }
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
