import { autoInjectable } from 'tsyringe';
import { razorpay } from '../../config/razor.config';
import crypto from 'crypto';

@autoInjectable()
export class RazorpayService {
    public async createOrder(amount: number): Promise<any> {
        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: 'paymentId',
            payment_capture: 1
        };

        return await razorpay.orders.create(options);
    }

    public verifySignature(orderId: string, paymentId: string, signature: string): boolean {
        const body = orderId + '|' + paymentId;

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!).update(body).digest('hex');

        return expectedSignature === signature;
    }
}
