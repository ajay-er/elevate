import { Investor } from "../model/Investor";

export class InvestorRepository {
	async create(): Promise<any> {
		return await Investor.create();
	}
	async findAll(): Promise<any> { 
		return await Investor.find({});
	}
}
