import { autoInjectable } from 'tsyringe';
import { InvestorRepository } from '../database/repository/investor.repository';

@autoInjectable()
export class InvestorService {
    constructor(private readonly investorRepo: InvestorRepository) {}

    public async create(investor:any) {
        return await this.investorRepo.create(investor);
    }

    public async get() {
        return await this.investorRepo.findAll();
    }

    public async findById(id: string) {
        return await this.investorRepo.findById(id);
    }
}
