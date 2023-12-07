import { Kafka } from 'kafkajs';

export const kafka_client = new Kafka({
    clientId: 'elevate-ideas-service',
    brokers: ['elevate-kafka:9092']
});
