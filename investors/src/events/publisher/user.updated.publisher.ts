import { kafkaPublisher, TOPIC } from '@ajay404/elevate';

export interface USER_UPDATED {
  topic: TOPIC.USER_UPDATED;
  data: {
    userId: string;
    firstName?: string;
    lastName?: string;
    profileImgUrl?: string;
  };
} 

export class USER_UPDATED_PUBLISHER extends kafkaPublisher<USER_UPDATED> {
    topic: TOPIC.USER_UPDATED = TOPIC.USER_UPDATED;
}
