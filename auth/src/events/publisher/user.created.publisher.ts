import { kafkaPublisher, TOPIC } from "@ajay404/elevate";

export interface USER_CREATED {
	topic: TOPIC.USER_CREATED;
	data: {
		id: string;
		name: string;
		email: string;
		profileImgUrl: string;
	}; 
}

export class USER_CREATED_PUBLISHER extends kafkaPublisher<USER_CREATED> {
    topic: TOPIC.USER_CREATED = TOPIC.USER_CREATED;
}
