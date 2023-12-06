import { NotFoundError, currentUser, errorHandler } from '@ajay404/elevate';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';
import { foundersRoute } from './lib/routes/founder.router';
import { paymentRoute } from './lib/routes/payment.router';

const app = express();

app.set('trust proxy', true);

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use(currentUser);
// routes
app.use(foundersRoute);

app.use(paymentRoute);


app.all('*', async (_req: Request, _res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;
