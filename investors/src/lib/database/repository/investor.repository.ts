import { IInvestor, Investor } from '../model/Investor';

export class InvestorRepository {
    async create(investor:any): Promise<any> {
        return await Investor.create(investor);
    }
    
    async findAll(): Promise<any> {
        return await Investor.find({});
    }

    async findById(id: string): Promise<any> {
        return await Investor.findById({ _id: id });
    }

    async findByUserId(id: string): Promise<any> {
        return await Investor.findOne({ user: id });
    }

    async updateProfile(investorId:string,update: Partial<IInvestor>): Promise<any> {
        return await Investor.updateOne({user:investorId},{$set:update});
    }
}
