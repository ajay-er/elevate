import { autoInjectable } from "tsyringe";
import { IrazorpayOrderData, IPaymentDetails } from "../interfaces";
import { RazorpayService } from "./razorpay.service";

@autoInjectable()
export class PaymentService {
    constructor(private readonly razorpay: RazorpayService) {}

    public async createOrder(paymentData: IrazorpayOrderData) {
        const razorpayOrder = await this.razorpay.createOrder(paymentData.amount);
        return razorpayOrder;
    }

    public async verifyPayment(paymentDetails: IPaymentDetails) {
        return this.razorpay.verifySignature(
            paymentDetails.razorpay_order_id,
            paymentDetails.razorpay_payment_id,
            paymentDetails.razorpay_signature
        );
    }
}
