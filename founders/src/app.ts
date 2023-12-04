import { NotFoundError, currentUser, errorHandler } from '@ajay404/elevate';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';
import { foundersRoute } from './lib/routes/founder.router';
import { paymentRoute } from './lib/routes/payment.router';

import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

app.set('trust proxy', true);

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use(currentUser);
// routes
app.use(foundersRoute);

app.use(paymentRoute);

const httpServer = createServer(app);
// initializeSocket(httpServer);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://elevate.test',
        credentials:true,
    },
});

const founder = io.of('/api/v1/founder/chat');

founder.on('connection', (socket) => {
    console.log('user connected founder');
    socket.on('message', (message) => {
        console.log(`Received message from founder: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from founders route');
    });
});

app.all('*', async (_req: Request, _res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default httpServer;
