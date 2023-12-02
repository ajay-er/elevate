import { IRole, kafkaPublisher, TOPIC } from '@ajay404/elevate';

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

export class USER_CREATED_PUBLISHER extends kafkaPublisher<USER_CREATED> {
    topic: TOPIC.USER_CREATED = TOPIC.USER_CREATED;
}
