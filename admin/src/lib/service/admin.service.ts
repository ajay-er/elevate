import { autoInjectable } from 'tsyringe';
import { AdminRepository } from '../database/repository/admin.repository';
import { IInvestor } from '../database/model/Investor';

@autoInjectable()
export class AdminService {
    constructor(private readonly adminRepo: AdminRepository) {}

    public async findAllInvestors(page:number,limit:number) {
        return await this.adminRepo.findAllInvestors(page,limit);
    }

    public async getVerifiedInvestorsCount() {
        return await this.adminRepo.getInvestorsCount();
    }

    public async getNotVerifiedInvestorsCount() {
        return await this.adminRepo.getNotVerifiedInvestorsCount();
    }

    public async findAllUnverifiedInvestors(page:number,limit:number) {
        return await this.adminRepo.findAllUnverifiedInvestors(page,limit);
    }

    public async updateVerifyInvestor(id:string) {
        return await this.adminRepo.verifyInvestor(id);
    }

    public async updateInvestorDetail(id:any,investorDetails:Partial<IInvestor>) {
        return await this.adminRepo.update(id,investorDetails);
    }

    public async createInvestor(id:string) {
        return await this.adminRepo.createInvestor(id);
    }

    public async findUser(id:string) {
        return await this.adminRepo.findUser(id);
    }

    public async findUserById(id:string) {
        return await this.adminRepo.findUserById(id);
    }

}
