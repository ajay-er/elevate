import { IInvestor, Investor } from "../model/Investor";

export class InvestorRepository {
    async create(investor: Partial<IInvestor>): Promise<any> {
        return await Investor.create(investor);
    }
    async findAll(): Promise<any> {
        return await Investor.find({});
    }
    async findById(id: string): Promise<any> {
        return await Investor.findById({ _id:id });
    }
}
