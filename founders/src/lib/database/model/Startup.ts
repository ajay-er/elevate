import mongoose, { Schema } from "mongoose";

const startupSchema = new Schema({
	companyName: {
		type: String,
		required: true
	},
	logo: String,
	description: String,
	industry: String,
	businessModel: String,
	foundingDate: Date,
	location: String,
	founders: [{ name: String, role: String }],
	teamMembers: [
		{
			name: String,
			title: String
		}
	],
	fundingStatus: {
		type: String,
		enum: ["Bootstrapped", "Seed Stage", "Early Stage", "Series A", "Series B", "Series C", "Late Stage", "Other"]
	},
	fundingAmount: Number,
	targetInvestmentAmount: Number,
	pitchDeckLink: String,
	website: String,
	socialMediaLinks: [String],
	productDemoLink: String,
	traction: String,
	marketProblem: String,
	solution: String,
	targetAudience: String,
	competitiveAdvantage: String,
	revenueModel: String,
	businessGoals: String,
	growthStrategy: String,
	currentChallenges: String,
	keyMetrics: String,
	exitStrategy: String,
	investmentInterests: [String],
	investmentGeographies: [String],
	preferredDealStructure: {
		type: String,
		enum: ["Equity", "Convertible Note", "SAFE", "Loan", "Other"]
	}
});

interface ITeamMember {
	name: string;
	title: string;
}

export interface IStartup extends mongoose.Document {
	companyName: string;
	logo: string;
	description?: string;
	industry?: string;
	businessModel?: string;
	foundingDate?: Date;
	location?: string;
	founders: { name: string; role: string }[];
	teamMembers?: ITeamMember[];
	fundingStatus?: "Bootstrapped" | "Seed Stage" | "Early Stage" | "Series A" | "Series B" | "Series C" | "Late Stage" | "Other";
	fundingAmount?: number;
	targetInvestmentAmount?: number;
	pitchDeckLink?: string;
	website?: string;
	socialMediaLinks?: string[];
	productDemoLink?: string;
	traction?: string;
	marketProblem?: string;
	solution?: string;
	targetAudience?: string;
	competitiveAdvantage?: string;
	revenueModel?: string;
	businessGoals?: string;
	growthStrategy?: string;
	currentChallenges?: string;
	keyMetrics?: string;
	exitStrategy?: string;
	investmentInterests?: string[];
	investmentGeographies?: string[];
	preferredDealStructure?: "Equity" | "Convertible Note" | "SAFE" | "Loan" | "Other";
}

const Startup = mongoose.model<IStartup>("Startup", startupSchema);

export { Startup };
