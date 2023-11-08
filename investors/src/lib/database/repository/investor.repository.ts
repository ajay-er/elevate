import { Investor } from "../model/Investor";

export class InvestorRepository {
	async create(): Promise<any> {
		return await Investor.create({});
	}

    

}
