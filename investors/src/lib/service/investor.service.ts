import { autoInjectable } from 'tsyringe';
import { InvestorRepository } from '../database/repository/investor.repository';
import { IInvestor } from '../database/model/Investor';

@autoInjectable()
export class InvestorService {
    constructor(private readonly investorRepo: InvestorRepository) {}

    public async create(investor:any) {
        return await this.investorRepo.create(investor);
    }

    public async get(page:number,limit:number) {
        return await this.investorRepo.findAll(page,limit);
    }

    public async findById(id: string):Promise<IInvestor | null> {
        return await this.investorRepo.findById(id);
    }

    public async findByUserId(id: string) {
        return await this.investorRepo.findByUserId(id);
    }

    public async update(investorId:string,update: Partial<IInvestor>) {
        return await this.investorRepo.updateProfile(investorId,update);
    }

    //for founder search 
    public async findByIdBasicPlan(id: string):Promise<IInvestor | null> {
        return await this.investorRepo.findByIdBasicPlan(id);
    }

    public async findByIdProPlan(id: string):Promise<IInvestor | null> {
        return await this.investorRepo.findByIdProPlan(id);
    }

    public async findByIdPremiumPlan(id: string):Promise<IInvestor | null> {
        return await this.investorRepo.findByIdPremiumPlan(id);
    }
}
