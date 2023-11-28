import mongoose, { Schema } from 'mongoose';

const startupSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    logo: String,
    bannerImage: String,
    website: String,
    pitchDeckLink: String,
    socialMediaLinks: [String],
    marketProblem: String,
    solution: String,
    targetAudience: String,
    description: String,
    industry: String,
    businessModel: String,
    foundingDate: Date,
    location: String,
    founders: [{ name: String, role: String }],
    teamMembers: [
        {
            name: String,
            title: String,
        },
    ],
    fundingStatus: {
        type: String,
        enum: [
            'Bootstrapped',
            'Seed Stage',
            'Early Stage',
            'Series A',
            'Series B',
            'Series C',
            'Late Stage',
            'Other',
        ],
    },
    isVerified: { type: Boolean, default: false },
    fundingAmount: Number,
    targetInvestmentAmount: Number,
    traction: String,
    competitiveAdvantage: String,
    revenueModel: String,
    businessGoals: String,
    growthStrategy: String,
    currentChallenges: String,
    keyMetrics: String,
    exitStrategy: String,
    investmentInterests: [String],
    investmentGeographies: [String],
    currentValuation: {
        type: Number,
        default: 0,
    },
    availableEquityShares: {
        type: Number,
        default: 0,
    },
    totalEquityShares: {
        type: Number,
        default: 0,
    },
    equitySales: [
        {
            investorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Investor',
            },
            investedAmount: Number,
            numberOfShares: Number,
            purchaseDate: Date,
        },
    ],
});

interface ITeamMember {
  name: string;
  title: string;
}

interface IInvestor {
  investorId: mongoose.Schema.Types.ObjectId;
  investedAmount: number;
  numberOfShares: number;
  purchaseDate: Date;
}

interface IStartup extends mongoose.Document {
  companyName: string;
  logo: string;
  description: string;
  industry: string;
  businessModel: string;
  foundingDate: Date;
  location: string;
  founders: { name: string; role: string }[];
  teamMembers: ITeamMember[];
  fundingStatus:
    | 'Bootstrapped'
    | 'Seed Stage'
    | 'Early Stage'
    | 'Series A'
    | 'Series B'
    | 'Series C'
    | 'Late Stage'
    | 'Other';
  fundingAmount: number;
  targetInvestmentAmount: number;
  pitchDeckLink: string;
  website: string;
  socialMediaLinks: string[];
  traction: string;
  marketProblem: string;
  solution: string;
  targetAudience: string;
  competitiveAdvantage: string;
  revenueModel: string;
  businessGoals: string;
  growthStrategy: string;
  currentChallenges: string;
  keyMetrics: string;
  exitStrategy: string;
  investmentInterests: string[];
  investmentGeographies: string[];

  currentValuation: number;
  availableEquityShares: number;
  totalEquityShares: number;
  equitySharePrice: number;
  equitySales: IInvestor[];
}

const Startup = mongoose.model<IStartup>('Startup', startupSchema);

export { Startup, IStartup };
