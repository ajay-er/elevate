import { BadRequestError, KafkaConsumer, TOPIC, USER_TOGGLE_BLOCK } from '@ajay404/elevate';
import { Kafka, KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';
import { UserService } from '../../lib/service/user.service';

const userService = container.resolve(UserService);

export class USER_TOGGLE_BLOCK_CONSUMER extends KafkaConsumer<USER_TOGGLE_BLOCK> {
    groupId: string = 'ideas-3';
    topic: TOPIC.USER_TOGGLE_BLOCK = TOPIC.USER_TOGGLE_BLOCK;

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: USER_TOGGLE_BLOCK['data'], _message: KafkaMessage): Promise<void> {
        try {
            const userId = data.userId;
            const user = await userService.findUserById(userId);
            if (!user) throw new BadRequestError('Oops!user not found');
            if (user) {
                user.isBlocked = data.isBlocked;
                await user.save();
            }
        } catch (error) {
            console.log(error);
        }
    }
}
