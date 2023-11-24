import { Kafka } from 'kafkajs';

export const kafka_client = new Kafka({
    clientId: 'elevate-search-service',
    brokers: ['elevate-kafka:9092']
});
