import { autoInjectable } from 'tsyringe';
import { FounderRepository } from '../database/mongo/repository/founder.repository';
import { PlanType } from '../types';

@autoInjectable()
export class FounderService {
    constructor(private readonly founderRepo: FounderRepository) {}
   
    public async addSubscription(subId:string,userId:string,plan:PlanType) {
        return this.founderRepo.create(subId,userId,plan);
    }
   
    public async updateSub(subId:string,payId:string,signature:string) {
        return this.founderRepo.updateSuccess(subId,payId,signature);
    }
}