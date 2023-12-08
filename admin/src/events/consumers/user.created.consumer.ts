import { KafkaConsumer, TOPIC } from '@ajay404/elevate';
import { Kafka, KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';
import { IUser } from '../../lib/database/model/User';
import { UserService } from '../../lib/service/user.service';

enum IRole {
  FOUNDER = 'FOUNDER',
  INVESTOR = 'INVESTOR',
}

export interface USER_CREATED {
  topic: TOPIC.USER_CREATED;
  data: {
    userId: string;
    firstName: string;
    lastName?: string;
    email: string;
    profileImgUrl: string;
    role: IRole;
  };
}

const userService = container.resolve(UserService);

export class USER_CREATED_EVENT_CONSUMER extends KafkaConsumer<USER_CREATED> {
    groupId: string = 'admin-1';
    topic: TOPIC.USER_CREATED = TOPIC.USER_CREATED;

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(
        data: USER_CREATED['data'],
        _message: KafkaMessage
    ): Promise<void> {
        try {
            await userService.createUser(data as IUser);
        } catch (error) {
            console.log(error);
        }
    }
}
