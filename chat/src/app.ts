import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'http';
import { currentUser } from '@ajay404/elevate';
import { messageRoute } from './lib/routes/message.route';
import { setupSocketIO } from './socket';

const app = express();

const httpServer = createServer(app);

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use(currentUser); 

app.use(messageRoute);

setupSocketIO(httpServer);

export default httpServer;
