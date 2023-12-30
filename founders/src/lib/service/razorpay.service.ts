import { autoInjectable } from 'tsyringe';
import crypto from 'crypto';
import { razorpay } from '../../config/razor.config';
import { PlanType } from '../types';
import { FounderRepository } from '../database/mongo/repository/founder.repository';

enum Plans { 
    BASIC_ID = 'plan_N7vx8YjRjn3Z3l',
    PRO_ID = 'plan_N7vxKVmhYdnu3l',
    PREMIUM_ID = 'plan_N7vxQhiZ2U60t9',
}

@autoInjectable()
export class RazorpayService {
    constructor(private founderRepo:FounderRepository) {}

    public async createSubcription(plan: string): Promise<any> {
        
        let plan_id = Plans.BASIC_ID;
        if (plan === PlanType.BASIC) {
            plan_id = Plans.BASIC_ID;
        } else if (plan === PlanType.PRO) {
            plan_id = Plans.PRO_ID;
        } if (plan === PlanType.PREMIUM) {
            plan_id = Plans.PREMIUM_ID;
        }
        const options = {
            plan_id:plan_id,
            total_count:1,
            quantity:1
        };
        return razorpay.subscriptions.create(options);
    }
    
    async updateSubscriptionStatus(id:string):Promise<any> {
        return  await this.founderRepo.changeSubscriptionStatus(id);
    }

    public verifySignature(
        subId: string,
        paymentId: string,
        signature: string
    ): boolean {
        const body = `${paymentId}|${subId}`;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body)
            .digest('hex');

        return expectedSignature === signature;
    }
}
