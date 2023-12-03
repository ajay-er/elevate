import { NotFoundError, currentUser, errorHandler } from '@ajay404/elevate';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import { ideasRoute } from './lib/routes/ideas.router';

const app = express();

app.set('trust proxy', true);

app.use(express.json());

app.use(morgan('dev'));

app.use(currentUser);
// routes
app.use(ideasRoute);

app.all('*', async (_req: Request, _res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;
