import { IInvestor, Investor } from '../model/Investor';

export class AdminRepository {
    
    public async findAllInvestors(page:number,limit:number) {
        const skip = (page - 1) * limit;
        return await Investor.find().skip(skip).limit(limit).populate('user').exec();
    }
    
    public async update(id:string,investorDetails:Partial<IInvestor>) {
        return await Investor.updateOne({user:id},investorDetails);
    }
    
    public async createInvestor(id:string) {
        return await Investor.create({user:id});
    }
}
