import { BadRequestError, INVESTOR_UPDATED, KafkaConsumer, TOPIC } from '@ajay404/elevate';
import { Kafka, KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';
import { UserService } from '../../lib/service/user.service';
import { InvestorService } from '../../lib/service/investor.service';

const userService = container.resolve(UserService);
const investorService = container.resolve(InvestorService);

export class INVESTOR_UPDATED_EVENT_CONSUMER extends KafkaConsumer<INVESTOR_UPDATED> {
    groupId: string = 'investors-4';
    topic: TOPIC.INVESTOR_UPDATED = TOPIC.INVESTOR_UPDATED;

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(
        data: INVESTOR_UPDATED['data'],
        _message: KafkaMessage
    ): Promise<void> {
        try {
            const userId = data.userId;
            const user = await userService.findUserById(userId);
            if (!user) throw new BadRequestError('user not found');
            const investor = await investorService.findByUserId(user.id);
            if (!investor) throw new BadRequestError('investor not found');
            investor.isVerified = data.isVerified;
            investor.save();
        } catch (error) {
            console.log(error);
        }
    }
}
