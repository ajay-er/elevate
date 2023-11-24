import mongoose, { Document } from 'mongoose';

const transaction = new mongoose.Schema({
    transactionType: { type: String, enum: ['investment', 'withdrawal'] },
    amount: Number,
    date: Date,
});

interface ITransaction extends Document {
  transactionType: 'investment' | 'withdrawal';
  amount: number;
  date: Date;
}

const Transaction = mongoose.model<ITransaction>('Transaction', transaction);

export { Transaction, ITransaction };
