import { KafkaConsumer, TOPIC } from '@ajay404/elevate';
import { Kafka, KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';
import { InvestorService } from '../../lib/service/investor.service';

export interface USER_CREATED {
	topic: TOPIC.USER_CREATED;
	data: {
		name: string;
		email: string;
		id: string;
		profileImgUrl: string;
	};
}

const investorService = container.resolve(InvestorService);

export class USER_CREATED_EVENT_CONSUMER extends KafkaConsumer<USER_CREATED> {
    groupId: string = TOPIC.USER_CREATED;
    topic: TOPIC.USER_CREATED = TOPIC.USER_CREATED;

    constructor(client: Kafka) {
        super(client);
    }

    async onMessage(data: USER_CREATED['data'], message: KafkaMessage): Promise<void> {
        try {
            await investorService.create({
                name: data.name,
                profileImgUrl: data?.profileImgUrl,
                email: data.email,
                investorId: data.id
            });
        } catch (error) {
            console.log(error);
        }
    }
}
