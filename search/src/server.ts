import 'reflect-metadata';
import app from './app';
import { PingElasticSearch } from './config/elastic.search.config';

const PORT = process.env.PORT || 3000;

(async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI not found');
    }
    try {
        console.clear();
        
        await PingElasticSearch();

        app.listen(PORT, () => {
            console.log(`Server-search is Listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect.');
        console.error(error);
    }
})();
