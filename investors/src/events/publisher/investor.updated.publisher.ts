import { INVESTOR_UPDATED, kafkaPublisher, TOPIC } from '@ajay404/elevate';

export class INVESTOR_UPDATED_PUBLISHER extends kafkaPublisher<INVESTOR_UPDATED> {
    topic: TOPIC.INVESTOR_UPDATED = TOPIC.INVESTOR_UPDATED;
}
