import mongoose, { Document } from 'mongoose';

const payment = new mongoose.Schema({
    investorId: String,
    paymentType: String,
    paymentDate: Date,
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILTED'],
    },
    razorpay: {
        order_id: String,
        payment_id: String,
        signature: String,
    },
});

interface IRazorpayDetails {
  order_id: string;
  payment_id: string;
  signature: string;
}

interface IPayment extends Document {
  investorId: string;
  paymentType: string;
  amountPaid: number;
  paymentDate: Date;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILTED';
  razorpay: IRazorpayDetails;
}

const Payment = mongoose.model<IPayment>('Payment', payment);

export { Payment };
