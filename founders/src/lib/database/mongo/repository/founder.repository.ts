import mongoose from 'mongoose';
import { PaymentStatus, PlanType, SubscriptionStatus } from '../../../types';
import { IRazorpayPaymentDetails, Subscription } from '../model/Subscription';

export class FounderRepository {
    async create(subId:string,userId:string,plan:PlanType): Promise<any> {
        return await Subscription.create({
            subscriptionId:subId,
            user:userId,
            plan,
            paymentDetails: {
                paymentProvider:'razorpay',
                paymentStatus:PaymentStatus.PENDING,
            } as IRazorpayPaymentDetails
        });
    }

    async updateSuccess(subId:string,payId:string,signature:string): Promise<any> {
        return await Subscription.findOneAndUpdate({subscriptionId:subId},{
            $set: {
                status:SubscriptionStatus.ACTIVE,
                paymentDetails: {
                    payment_id:payId,
                    signature,
                    paymentStatus:PaymentStatus.SUCCESS
                } as IRazorpayPaymentDetails
            }
        },
        { returnDocument: 'after' }
        );
    }

    async updateFailed(subId:string): Promise<any> {
        return await Subscription.updateOne({subscriptionId:subId},{
            status:SubscriptionStatus.ACTIVE,
            paymentDetails: {
                paymentStatus:PaymentStatus.FAILED
            } as IRazorpayPaymentDetails
        });
    }

    async getSubscriptions(user:string): Promise<any> {
        const userObjectId = new mongoose.Types.ObjectId(user);
        return await Subscription.find({user:userObjectId});
    }

}
