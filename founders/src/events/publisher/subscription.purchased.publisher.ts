import { kafkaPublisher, TOPIC,SUBSCRIPTION_PURCHASED } from '@ajay404/elevate';

export class SUBSCRIPTION_PURCHASED_PUBLISHER extends kafkaPublisher<SUBSCRIPTION_PURCHASED> {
    topic: TOPIC.SUBSCRIPTION_PURCHASED = TOPIC.SUBSCRIPTION_PURCHASED;
}
