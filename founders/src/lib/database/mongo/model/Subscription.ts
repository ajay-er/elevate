import mongoose, { Document } from 'mongoose';
import { PaymentStatus, PlanType, SubscriptionStatus } from '../../../types';

interface IPaymentDetails {
    paymentProvider: string;
    paymentStatus: PaymentStatus;
}

interface IRazorpayPaymentDetails extends IPaymentDetails {
    paymentProvider: 'razorpay';
    payment_id: string;
    signature: string;
}

interface ISubscription extends Document {
    user: mongoose.Types.ObjectId;
    plan: PlanType;
    status: SubscriptionStatus;
    paymentDetails:  IPaymentDetails | IRazorpayPaymentDetails;
    subscriptionId:string
}

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        plan: {
            type: String,
            enum: Object.values(PlanType),
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(SubscriptionStatus),
        },
        paymentDetails: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        subscriptionId: {
            type: String,
            required: true,
        },
    }, 
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true,
    }
);

const Subscription = mongoose.model<ISubscription>(
    'Subscription',
    subscriptionSchema
);

export { Subscription, ISubscription, PlanType , IRazorpayPaymentDetails };
