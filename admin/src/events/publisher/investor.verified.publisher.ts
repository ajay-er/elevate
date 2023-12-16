import { INVESTOR_UPDATED, kafkaPublisher, TOPIC } from '@ajay404/elevate';

export class VERIFY_INVESTOR_PUBLISHER extends kafkaPublisher<INVESTOR_UPDATED> {
    topic: TOPIC.INVESTOR_UPDATED = TOPIC.INVESTOR_UPDATED;
}
