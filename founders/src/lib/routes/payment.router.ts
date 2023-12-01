import express from 'express';
import { paymentController } from '../controllers/payment.controller';

const router = express.Router();

router.post(
    '/api/v1/investor/payment/razorpay-order',
    paymentController.createRazorpayOrder
);

router.post(
    '/api/v1/investor/payment/razorpay-verification',
    paymentController.verifyRazorpayPayment
);

export { router as paymentRoute };
