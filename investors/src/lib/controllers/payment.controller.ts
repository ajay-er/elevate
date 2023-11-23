import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { PaymentService } from "../service/payment.service";

const router = express.Router();

const paymentService = container.resolve(PaymentService);

router.post("/razorpay-order", async (req: Request, res: Response) => {
    const { amount } = req.body;
    const order = await paymentService.createOrder(req.body);
    if (!order) throw new Error("Some error occured razorpay order creation failed");
    return res.status(200).json({ orderId: order.id!, amount });
});

router.post("/razorpay-verification", async (req: Request, res: Response) => {
    const isVerificationSuccessful = await paymentService.verifyPayment(req.body);
    isVerificationSuccessful ? res.status(200).json({ success: isVerificationSuccessful }) : res.status(400).json({ error: "Invalid payment signature" });
});

export { router as paymentRoute };
