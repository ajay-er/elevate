import { Payment } from '../model/Payment';

export class PaymentRepository {
    async createPaymentOrder(payment: string): Promise<any> {
        return await Payment.create(payment);
    }
}
