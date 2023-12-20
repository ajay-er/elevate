import express from 'express';
import { paymentController } from '../controllers/payment.controller';
import { requireAuth } from '@ajay404/elevate';

const router = express.Router();

router.post(
    '/api/v1/founder/payment/razorpay-order',
    requireAuth,
    paymentController.createRazorpaySubcription
);

router.post(
    '/api/v1/founder/payment/razorpay-verification',
    paymentController.verifyRazorpayPayment
);

export { router as paymentRoute };
