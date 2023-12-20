import {
    BadRequestError,
    KafkaConsumer,
    SUBSCRIPTION_PURCHASED,
    TOPIC,
} from '@ajay404/elevate';
import { Kafka, KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';
import { UserService } from '../../lib/service/user.service';
import { IRole, PlanType } from '../../lib/interfaces';

const userService = container.resolve(UserService);

export class SUBSCRIPTION_PURCHASED_EVENT_CONSUMER extends KafkaConsumer<SUBSCRIPTION_PURCHASED> {
    groupId: string = 'investors-5';
    topic: TOPIC.SUBSCRIPTION_PURCHASED = TOPIC.SUBSCRIPTION_PURCHASED;

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(
        data: SUBSCRIPTION_PURCHASED['data'],
        _message: KafkaMessage
    ): Promise<void> {
        try {            
            const userId = data.userId;
            const user = await userService.findUserById(userId);
            if (!user) throw new BadRequestError('user not found');
            if (user.role === IRole.FOUNDER) {
                if (data.plan === PlanType.BASIC) {
                    user.subscription.plan = PlanType.BASIC;
                } else if (data.plan === PlanType.PREMIUM) {
                    user.subscription.plan = PlanType.PREMIUM;
                } else if (data.plan === PlanType.PRO) {
                    user.subscription.plan = PlanType.PRO;
                }
                user.subscription.status = data.subscriptionStatus;
                await user.save();
            }
        } catch (error) {
            console.log(error);
        }
    }
}
