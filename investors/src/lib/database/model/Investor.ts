import mongoose, { Schema } from "mongoose";

const investorSchema = new Schema({
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
			enum: ["Micro", "Small", "Medium", "Large"]
		},
		geographicPreference: [String],
		investmentExperience: Number,
		preferredCommunicationMethod: {
			type: String,
			enum: ["Email", "Phone", "In-person", "Other"]
		},
		interests: [String]
	},
	investmentHistory: [
		{
			companyName: String,
			industry: String,
			investmentStage: String,
			investmentAmount: Number,
			investmentDate: Date
		}
	],
	portfolio: [
		{
			id: String,
			companyName: String,
			industry: String,
			investmentAmount: Number,
			equityPercentage: Number,
			investmentDate: Date,
			notes: String
		}
	],
	currentInvestments: [
		{
			id: String,
			companyName: String,
			industry: String,
			investmentStage: String,
			investmentAmount: Number,
			equityPercentage: Number,
			notes: String
		}
	],
	investmentInterests: [String],
	investmentStrategy: String,
	riskAppetite: String,
	preferredDealStructure: {
		type: String,
		enum: ["Equity", "Convertible Note", "SAFE", "Loan", "Other"]
	},
	investmentGeographies: [String]
});

export interface IInvestor extends mongoose.Document {
	bio: string;
	about: string;
	description: string;
	investmentCriteria: {
		investmentStage: string;
		industries: string[];
		investmentSize: string;
		geographicPreference: string[];
		investmentExperience: number;
		preferredCommunicationMethod: string;
		interests: string[];
	};
	investmentHistory: {
		companyName: string;
		industry: string;
		investmentStage: string;
		investmentAmount: number;
		investmentDate: Date;
	}[];
	portfolio: {
		id: string;
		companyName: string;
		industry: string;
		investmentAmount: number;
		equityPercentage: number;
		investmentDate: Date;
		notes: string;
	}[];
	currentInvestments: {
		id: string;
		companyName: string;
		industry: string;
		investmentStage: string;
		investmentAmount: number;
		equityPercentage: number;
		notes: string;
	}[];
	investmentInterests: string[];
	investmentStrategy: string;
	riskAppetite: string;
	preferredDealStructure: string;
	investmentGeographies: string[];
}

const Investor = mongoose.model<IInvestor>("Investor", investorSchema);

export { Investor };
