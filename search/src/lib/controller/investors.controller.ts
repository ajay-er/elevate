import express, { Request, Response } from 'express';
import { ELASTIC_CLIENT } from '../../config/elastic.search.config';
import { BadRequestError } from '@ajay404/elevate';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const searchQuery = req.query.q as string;

    if (!searchQuery) {
        throw new BadRequestError('Search query is missing');
    }

    const response = await ELASTIC_CLIENT.search({
        index: 'investors',
        body: {
            query: {
                multi_match: {
                    query: searchQuery,
                    fields: ['investmentMarkets^3', 'investmentLocations']
                }
            }
        }
    });

    const hits = response.hits.hits;
    const results = hits.map((hit) => hit._source);
    res.send(results);
});

export { router as investorRoute };
