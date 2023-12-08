import { BadRequestError, KafkaConsumer, TOPIC } from '@ajay404/elevate';
import { Kafka, KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';
import { AuthService } from '../../lib/service/auth.service';

export interface USER_UPDATED {
    topic: TOPIC.USER_UPDATED;
    data: {
      userId: string;
      firstName?: string;
      lastName?: string;
      profileImgUrl?: string;
    };
  }

const userService = container.resolve(AuthService);

export class USER_UPDATED_EVENT_CONSUMER extends KafkaConsumer<USER_UPDATED> {
    groupId: string = 'auth-1';
    topic: TOPIC.USER_UPDATED = TOPIC.USER_UPDATED;

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: USER_UPDATED['data'], _message: KafkaMessage): Promise<void> {
        try {
            const userId = data.userId;
            const user = await userService.findById(userId);
            if (!user) throw new BadRequestError('Oops!user not found');
            if (user) {
                Object.assign(user, data);
                await userService.saveUser(user);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
