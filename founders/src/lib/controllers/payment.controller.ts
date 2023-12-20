import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { BadRequestError, UnAuthorizedError } from '@ajay404/elevate';
import { RazorpayService } from '../service/razorpay.service';
import { IPaymentDetails } from '../types';
import { UserService } from '../service/user.service';
import { FounderService } from '../service/founder.service';

const paymentService = container.resolve(RazorpayService);
const userService = container.resolve(UserService);
const founderService = container.resolve(FounderService);

class PaymentController {
    async createRazorpaySubcription(req: Request, res: Response) {
        if (!req.currentUser?.id) throw new UnAuthorizedError();
        const { plan } = req.body;
        const user = await userService.findUserById(req.currentUser.id);
        if (!user) throw new BadRequestError('user not found');
        const sub = await paymentService.createSubcription(plan);
        if (!sub) throw new Error('Some error occurred! order creation failed');
        await founderService.addSubscription(sub.id,user.id,plan);
        const subscription = { name:user.firstName,email:user.email, ...sub};
        res.status(200).json({
            subscription, status: 'SUCCESS'
        });
    }

    async verifyRazorpayPayment(req: Request, res: Response) {
        const paymentDetails:IPaymentDetails = req.body.data;
        const isVerificationSuccessful = paymentService.verifySignature(
            paymentDetails.razorpay_subscription_id,
            paymentDetails.razorpay_payment_id,
            paymentDetails.razorpay_signature
        );
        await founderService.updateSub(paymentDetails.razorpay_subscription_id,
            paymentDetails.razorpay_payment_id,
            paymentDetails.razorpay_signature);
        isVerificationSuccessful ? res.status(200).json({ success: isVerificationSuccessful }) : res.status(400).json({ error: 'Invalid payment signature' });
    }

    // async paymentFailed(req: Request, res: Response) {
    //     // const { payload } = req.body;
    //     // if (!payload || !payload.payment || !payload.payment.entity) {
    //     //     return res.status(400).json({
    //     //         status: 'Invalid webhook request body structure.',
    //     //     });
    //     // }
    //     // const receivedEventId = req.headers['x-razorpay-event-id'];
        
    //     // const event = await EventModel.findOne({ eventId: receivedEventId });

    //     // if (event) return res.status(200).json({ status: 'Event already processed' });
    //     // const requestedBody = JSON.stringify(req.body);
    //     // const receivedSignature = req.headers['x-razorpay-signature'];

    //     // const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

    //     // const isVerified = razorpay.validateWebhookSignature(
    //     //     requestedBody,
    //     //     receivedSignature as string,
    //     //     WEBHOOK_SECRET!
    //     // );
    //     // if (!isVerified) return res.status(400).json({
    //     //     status: 'Signature not valid.',
    //     // });
    //     // const eventName = req.body['event'];
    //     // await EventModel.create({ eventId: receivedEventId, name: eventName });

    // }
}

export const paymentController = new PaymentController();
