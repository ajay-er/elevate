import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { currentUser } from '@ajay404/elevate';
import { messageRoute } from './lib/routes/message.route';
import { container } from 'tsyringe';
import { MessageService } from './lib/service/message.service';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    path:'/api/v1/chat/socket.io',
    cors: {
        origin: 'http://elevate.test',
        allowedHeaders: ['Authentication'],
        credentials: true
    },
});

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use(currentUser);

app.use(messageRoute);

const messageService = container.resolve(MessageService);

io.on('connection',  (socket) => {
    console.log('user connected');
    socket.on('message', async (data) => {
        const { sender, recipient, text } = data;

        const message = await messageService.addMessage(sender,recipient,text);

        io.to(sender).to(recipient).emit('message', message);
    });

    // socket.on('join', ({ sender, recipient }) => {
    //     const room = `${sender}-${recipient}`;
    //     socket.join(room);
    //     console.log(`Users ${sender} and ${recipient} joined the room ${room}`);
    // });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        const sockets: any = io.sockets.sockets;
        sockets[socket.id]?.rooms.forEach((room: string) => {
            socket.leave(room);
            console.log(`User left room ${room}`);
        });
    });
});

export default httpServer;
