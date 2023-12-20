import 'reflect-metadata';
import app from './app';
import mongoConnect from './config/mongo';
import { kafka_client } from './config/kafka.config';
import { USER_CREATED_EVENT_CONSUMER } from './events/consumers/user.created.consumer';
import { USER_TOGGLE_BLOCK_CONSUMER } from './events/consumers/user.toggleblock.consumer';
import { INVESTOR_UPDATED_EVENT_CONSUMER } from './events/consumers/investor.updated.consumer';
import { SUBSCRIPTION_PURCHASED_EVENT_CONSUMER } from './events/consumers/subscription.success.consumer';

const PORT = process.env.PORT || 3000;

(async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI not found');
    }
    try {
        console.clear();		
        await mongoConnect(process.env.MONGO_URI);
		
        await new USER_CREATED_EVENT_CONSUMER(kafka_client).subscribe();
        await new USER_TOGGLE_BLOCK_CONSUMER(kafka_client).subscribe();
        await new INVESTOR_UPDATED_EVENT_CONSUMER(kafka_client).subscribe();
        await new SUBSCRIPTION_PURCHASED_EVENT_CONSUMER(kafka_client).subscribe();

        app.listen(PORT, () => {
            console.log(`Server-Investors is Listening on port ${PORT}`);
        })
            .on('error', async () => {
                console.log('oops something goes wrong');
            })
            .on('close', async () => {});
    } catch (error) {
        console.error('Unable to connect.');
        console.error(error);
    }
})();
