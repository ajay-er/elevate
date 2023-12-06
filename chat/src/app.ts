import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

const httpServer = createServer(app);

const io = new Server(httpServer, {
    path:'/api/v1/chat/socket.io',
    cors: {
        origin: 'http://elevate.test',
        methods:['GET','POST'],
    },
});

// const test = io.of('/api/v1/chat');

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (message) => {
        console.log(`Received message from user: ${message.message}`);
        io.emit('message', { message: message.message });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

export default httpServer;
