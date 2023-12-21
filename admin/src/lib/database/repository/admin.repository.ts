import { IInvestor, Investor } from '../model/Investor';

export class AdminRepository {
    public async findAllInvestors(page: number, limit: number) {
        const skip = (page - 1) * limit;
        return await Investor.find()
            .skip(skip)
            .limit(limit)
            .populate('user')
            .exec();
    }

    public async getInvestorsCount() {
        return await Investor.find({ isVerified:true }).countDocuments();
    }

    public async getNotVerifiedInvestorsCount() {
        return await Investor.find({ isVerified:false }).countDocuments();
    }

    public async findAllUnverifiedInvestors(page: number, limit: number) {
        const skip = (page - 1) * limit;
        return await Investor.find({ isVerified: false })
            .skip(skip)
            .limit(limit)
            .populate('user')
            .exec();
    }

    public async update(id: string, investorDetails: Partial<IInvestor>) {
        return await Investor.updateOne({ user: id }, investorDetails);
    }

    public async verifyInvestor(id: string) {
        return await Investor.updateOne({ _id: id }, { isVerified: true });
    }

    public async createInvestor(id: string) {
        return await Investor.create({ user: id });
    }

    public async findUser(id: string) {
        return await Investor.findOne({ user: id });
    }

    public async findUserById(id: string) {
        return await Investor.findById({ _id: id }).populate('user');
    }
  
}
