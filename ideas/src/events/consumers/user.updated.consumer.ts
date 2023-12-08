import { KafkaConsumer, TOPIC } from '@ajay404/elevate';
import { Kafka, KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';
import { UserService } from '../../lib/service/user.service';
import { IUser } from '../../lib/database/model/User';

export interface USER_UPDATED {
    topic: TOPIC.USER_UPDATED;
    data: {
      userId: string;
      firstName?: string;
      lastName?: string;
      profileImgUrl?: string;
    };
  }

const userService = container.resolve(UserService);

export class USER_UPDATED_EVENT_CONSUMER extends KafkaConsumer<USER_UPDATED> {
    groupId: string = 'ideas-2';
    topic: TOPIC.USER_UPDATED = TOPIC.USER_UPDATED;

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: USER_UPDATED['data'], _message: KafkaMessage): Promise<void> {
        try {
            const userId = data.userId;
            await userService.update(userId,data as IUser);
        } catch (error) {
            console.log(error);
        }
    }
}
