import mongoose, { Schema } from "mongoose";
import { IInvestmentDetail } from "./InvestmentDetails";
import { ITransaction } from "./Transaction";

enum InvestmentSize {
	Micro = "Micro",
	Small = "Small",
	Medium = "Medium",
	Large = "Large"
}

enum RiskAppetite {
	Low = "Low",
	Medium = "Medium",
	High = "High"
}

const investorSchema = new Schema(
	{
		investorId: String,
		profileImgUrl: String,
		name: String,
		email: String,
		bio: String,
		about: String,
		description: String,
		investmentCriteria: {
			investmentStage: {
				type: String,
				enum: ["Seed", "Early Stage", "Series A", "Series B", "Series C", "Late Stage", "Other"]
			},
			industries: [String],
			investmentSize: {
				type: String,
				enum: Object.values(InvestmentSize)
			},
			geographicPreference: [String],
			investmentExperience: {
				type: Number,
				min: 0
			},
			preferredCommunicationMethod: {
				type: String,
				enum: ["Email", "Phone", "In-person", "Other"]
			},
			investmentInterests: [String]
		},
		investmentHistory: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "InvestmentDetail"
			}
		],
		portfolio: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "InvestmentDetail"
			}
		],
		currentInvestments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "InvestmentDetail"
			}
		],
		investmentStrategy: String,
		riskAppetite: {
			type: String,
			enum: Object.values(RiskAppetite)
		},
		preferredDealStructure: {
			type: String,
			enum: ["Equity", "Convertible Note", "SAFE", "Loan", "Other"]
		},
		investmentGeographies: [String],
		transactionHistory: [
			{
				type: Schema.Types.ObjectId,
				ref: "Transaction"
			}
		]
	},
	{
		timestamps: true
	}
);

interface IInvestmentCriteria {
	investmentStage: string;
	industries: string[];
	investmentSize: string;
	geographicPreference: string[];
	investmentExperience: number;
	preferredCommunicationMethod: string;
	investmentInterests: string[];
}

export interface IInvestor extends mongoose.Document {
	investorId: string;
	profileImgUrl: string;
	name: string;
	email: string;
	bio: string;
	about: string;
	description: string;
	investmentCriteria: IInvestmentCriteria;
	investmentHistory: IInvestmentDetail[];
	portfolio: IInvestmentDetail[];
	currentInvestments: IInvestmentDetail[];
	investmentStrategy: string;
	riskAppetite: string;
	preferredDealStructure: string;
	investmentGeographies: string[];
	transactionHistory: ITransaction[];
}

const Investor = mongoose.model<IInvestor>("Investor", investorSchema);

export { Investor };
