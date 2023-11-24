import mongoose, { Document } from 'mongoose';

const payment = new mongoose.Schema({
    investorId: String,
    paymentType: String,
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
    },
    amountPaid: Number,
    paymentDate: Date,
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
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
  transactionId: mongoose.Types.ObjectId;
  amountPaid: number;
  paymentDate: Date;
  paymentStatus: 'pending' | 'completed' | 'failed';
  razorpay: IRazorpayDetails;
}

const Payment = mongoose.model<IPayment>('Payment', payment);

export { Payment };
