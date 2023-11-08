import { autoInjectable } from "tsyringe";
import { InvestorRepository } from "../database/repository/investor.repository";

@autoInjectable()
export class InvestorService {
	constructor(private readonly investorRepo: InvestorRepository) {}

	public async create() {
		return await this.investorRepo.create();
	}

	public async get() {
		return await this.investorRepo.findAll();
	}
}
