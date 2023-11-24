import mongoose,{ Document } from 'mongoose';

const investmentDetails = new mongoose.Schema(
    {
        investorId: String,
        startup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Startup',
            required: true
        },
        investmentAmount: Number,
        equityPercentage: Number,
        valuation: Number,
        shares: Number,
        investmentDate: Date,
        investmentStage: String,
        paymentDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment'
        },
        investmentStatus: {
            type: String,
            enum: ['pending', 'completed', 'ongoing']
        },
        investmentTerm: String,
        exitStrategy: String,
        notes: String
    },
    { timestamps: true }
);

interface IInvestmentDetail extends Document {
	investorId: string;
	startup: mongoose.Types.ObjectId;
	investmentAmount: number;
	equityPercentage: number;
	valuation: number;
	shares: number;
	investmentDate: Date;
	investmentStage: string;
	paymentDetails: mongoose.Types.ObjectId;
	investmentStatus: 'pending' | 'completed' | 'ongoing';
	investmentTerm: string;
	exitStrategy: string;
	notes: string;
}

const Investor = mongoose.model<IInvestmentDetail>('InvestmentDetail', investmentDetails);

export { Investor, IInvestmentDetail };
