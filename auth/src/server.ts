import 'reflect-metadata';
import app from './app';
import mongoConnect from './config/mongo';
import { USER_UPDATED_EVENT_CONSUMER } from './events/consumer/user.updated.consumer';
import { kafka_client } from './config/kafka.config';
import { USER_TOGGLE_BLOCK_CONSUMER } from './events/consumer/user.toggleblock.consumer';

const PORT = process.env.PORT || 3000;

(async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI not found');
    }
    try {
        console.clear();
        await new USER_UPDATED_EVENT_CONSUMER(kafka_client).subscribe();
        await new USER_TOGGLE_BLOCK_CONSUMER(kafka_client).subscribe();

        await mongoConnect(process.env.MONGO_URI);

        app.listen(PORT, () => {
            console.log(`Server-Auth is Listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect.');
        console.error(error);
    }
})();
