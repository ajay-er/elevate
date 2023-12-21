import { autoInjectable } from 'tsyringe';
import { FounderRepository } from '../database/mongo/repository/founder.repository';
import { PlanType } from '../types';

@autoInjectable()
export class FounderService {
    constructor(private readonly founderRepo: FounderRepository) {}
   
    public async addSubscription(subId:string,userId:string,plan:PlanType) {
        return this.founderRepo.create(subId,userId,plan);
    }

    public async getAllSubcriptions(user:string) {
        return this.founderRepo.getSubscriptions(user);
    }
   
    public async updateSub(subId:string,payId:string,signature:string) {
        return this.founderRepo.updateSuccess(subId,payId,signature);
    }
   
    public async getAllSubcriptionsCount() {
        return this.founderRepo.findTotalCount();
    }
   
    public async getPendingSubscriptionCount() {
        return this.founderRepo.findPendingSubTotalCount();
    }
   
    public async findTotalProfit() {
        return this.founderRepo.totalProfit();
    }
   
    public async getChartData() {
        return this.founderRepo.chartData();
    }
   
    public async getChart2Data() {
        return this.founderRepo.chart2Data();
    }
}
