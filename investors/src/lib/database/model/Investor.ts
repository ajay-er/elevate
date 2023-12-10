import mongoose, { Schema, Document } from 'mongoose';
import { investmentAmountVariants } from '../../interfaces';

const investorSchema = new Schema(
    {
        phone:String,
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
        isVerified: {type:Boolean,default:false}
    },
    { 
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true 
    }
);

interface IInvestor extends Document {
  user: Schema.Types.ObjectId;
  bio?: string;
  phone:string;
  website?: string;
  socialMediaLinks?: SocialMediaLinks;
  investmentLocations?: InvestmentLocations;
  investmentMarkets?: InvestmentMarkets;
  totalInvestmentCount?: number;
  investmentAmount?: typeof investmentAmountVariants;
  isVerified:boolean;
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
