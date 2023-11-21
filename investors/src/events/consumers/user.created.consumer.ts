import { KafkaConsumer, TOPIC } from "@ajay404/elevate";
import { Kafka, KafkaMessage } from "kafkajs";

export interface USER_CREATED {
	topic: TOPIC.USER_CREATED;
	data: {
		firstName: string;
		email: string;
		id: string;
		profileImgUrl: string;
	};
}
export class USER_CREATED_EVENT_CONSUMER extends KafkaConsumer<USER_CREATED> {
	groupId: string = TOPIC.USER_CREATED;

	topic: TOPIC.USER_CREATED = TOPIC.USER_CREATED;

	constructor(client: Kafka) {
		super(client);
	}

	async onMessage(data: USER_CREATED["data"], message: KafkaMessage): Promise<void> {
		try {
            console.log(message,'ithanu msg 🌎🚀');
            console.log(data,'ithanu data 🥲');
            
		} catch (error) {
			console.log(error);
		}
	}
}
