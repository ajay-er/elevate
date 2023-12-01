import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { PaymentService } from '../../../../investors/src/lib/service/payment.service';

const paymentService = container.resolve(PaymentService);

class PaymentController {
    async createRazorpayOrder(req: Request, res: Response) {
        const { amount } = req.body;
        const order = await paymentService.createOrder(req.body);
        if (!order)
        { throw new Error('Some error occurred; Razorpay order creation failed');}
        res.status(200).json({ orderId: order.id!, amount });
    }

    async verifyRazorpayPayment(req: Request, res: Response) {
        const isVerificationSuccessful = await paymentService.verifyPayment(
            req.body
        );
        isVerificationSuccessful ? res.status(200).json({ success: isVerificationSuccessful }) : res.status(400).json({ error: 'Invalid payment signature' });
    }
}

export const paymentController = new PaymentController();
