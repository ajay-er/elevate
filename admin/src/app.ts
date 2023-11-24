import { NotFoundError, errorHandler } from '@ajay404/elevate';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';

const app = express();

app.set('trust proxy', true);

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.all('*', async (_req: Request, _res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;
