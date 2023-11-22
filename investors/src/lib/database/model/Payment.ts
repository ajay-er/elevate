import mongoose from "mongoose";

const payment = new mongoose.Schema({
	investorId: String,
	paymentType: String,
	transactionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Transaction"
	},
	amountPaid: Number,
	paymentDate: Date,
	paymentStatus: {
		type: String,
		enum: ["pending", "completed", "failed"]
	}
});

interface IPayment extends Document {
	investorId: string;
	paymentType: string;
	transactionId: mongoose.Types.ObjectId;
	amountPaid: number;
	paymentDate: Date;
	paymentStatus: "pending" | "completed" | "failed";
}

const Payment = mongoose.model<IPayment>("Payment", payment);

export { Payment };
