import { autoInjectable } from "tsyringe";
import { InvestorRepository } from "../database/repository/investor.repository";
import { IInvestor } from "../database/model/Investor";

@autoInjectable()
export class InvestorService {
	constructor(private readonly investorRepo: InvestorRepository) {}

	public async create(investor:Partial<IInvestor>) {
		return await this.investorRepo.create(investor);
	}

	public async get() {
		return await this.investorRepo.findAll();
	}
}
