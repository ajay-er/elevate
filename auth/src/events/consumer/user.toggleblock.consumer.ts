import { BadRequestError, KafkaConsumer, TOPIC, USER_TOGGLE_BLOCK } from '@ajay404/elevate';
import { Kafka, KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';
import { AuthService } from '../../lib/service/auth.service';

const userService = container.resolve(AuthService);

export class USER_TOGGLE_BLOCK_CONSUMER extends KafkaConsumer<USER_TOGGLE_BLOCK> {
    groupId: string = 'auth-2';
    topic: TOPIC.USER_TOGGLE_BLOCK = TOPIC.USER_TOGGLE_BLOCK;

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: USER_TOGGLE_BLOCK['data'], _message: KafkaMessage): Promise<void> {
        try {
            const userId = data.userId;
            const user = await userService.findById(userId);
            if (!user) throw new BadRequestError('Oops!user not found');
            if (user) {
                user.isBlocked = data.isBlocked;
                await userService.saveUser(user);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
