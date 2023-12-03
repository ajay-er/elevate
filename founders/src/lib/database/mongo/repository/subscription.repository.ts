import { Subscription } from '../model/Subscription';

export class SubscriptionRepository {
    public async createSubscription(subcriptionId:string) {
        return await Subscription.create({
            subscriptionId: subcriptionId,
            
        });
    }
}
