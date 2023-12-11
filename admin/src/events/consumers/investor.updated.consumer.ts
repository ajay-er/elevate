import { INVESTOR_UPDATED, KafkaConsumer, TOPIC } from '@ajay404/elevate';
import { Kafka, KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';
import { UserService } from '../../lib/service/user.service';
import { AdminService } from '../../lib/service/admin.service';

const userService = container.resolve(UserService);
const adminService = container.resolve(AdminService);

export class INVESTOR_UPDATED_EVENT_CONSUMER extends KafkaConsumer<INVESTOR_UPDATED> {
    groupId: string = 'admin-3';
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
            console.log(data,'here the data sample');
            
            const investor = await adminService.updateInvestorDetail(user?.id,data);
            console.log(investor);
            
        } catch (error) {
            console.log(error);
        }
    }
}
