import 'reflect-metadata';
import app from './app';
import mongoConnect from './config/mongo';
import { PingElasticSearch } from './config/elastic.search.config';
import { USER_CREATED_EVENT_CONSUMER } from './events/consumers/user.created.consumer';
import { kafka_client } from './config/kafka.config';
import { USER_UPDATED_EVENT_CONSUMER } from './events/consumers/user.updated.consumer';
import { USER_TOGGLE_BLOCK_CONSUMER } from './events/consumers/user.toggleblock.consumer';

const PORT = process.env.PORT || 3000;

(async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI not found');
    }
    try {
        console.clear();
        await mongoConnect(process.env.MONGO_URI);
        await new USER_CREATED_EVENT_CONSUMER(kafka_client).subscribe();
        await new USER_UPDATED_EVENT_CONSUMER(kafka_client).subscribe();
        await new USER_TOGGLE_BLOCK_CONSUMER(kafka_client).subscribe();

        await PingElasticSearch();

        app.listen(PORT, () => {
            console.log(`Server-Startups is Listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect.');
        console.error(error);
    }
})();
