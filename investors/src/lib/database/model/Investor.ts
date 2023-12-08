import mongoose, { Schema, Document } from 'mongoose';
import { investmentAmountVariants } from '../../interfaces';

const investorSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bio: String,
        website: String,
        socialMediaLinks: {
            twitter: String,
            youtube: String,
            facebook: String,
            linkedin: String,
        },
        investmentLocations: {
            type: [String],
        },
        investmentMarkets: {
            type: [String],
        },
        totalInvestmentCount: Number,
        investmentAmount: {
            type: String,
            enum: investmentAmountVariants,
        },
    },
    {
        timestamps: true,
    }
);

interface IInvestor extends Document {
  user: Schema.Types.ObjectId;
  bio?: string;
  website?: string;
  socialMediaLinks?: SocialMediaLinks;
  investmentLocations?: InvestmentLocations;
  investmentMarkets?: InvestmentMarkets;
  totalInvestmentCount?: number;
  investmentAmount?: typeof investmentAmountVariants;
  createdAt: Date;
  updatedAt: Date;
}

interface SocialMediaLinks {
  twitter?: string;
  youtube?: string;
  facebook?: string;
  linkedin?: string;
}

interface InvestmentLocations {
  type: string[];
}

interface InvestmentMarkets {
  type: string[];
}

const Investor = mongoose.model<IInvestor>('Investor', investorSchema);

export { Investor , IInvestor};
