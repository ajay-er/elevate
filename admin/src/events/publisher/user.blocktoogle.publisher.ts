import { kafkaPublisher, TOPIC, USER_TOGGLE_BLOCK } from '@ajay404/elevate';

export class USER_TOGGLE_BLOCK_PUBLISHER extends kafkaPublisher<USER_TOGGLE_BLOCK> {
    topic: TOPIC.USER_TOGGLE_BLOCK = TOPIC.USER_TOGGLE_BLOCK;
}
