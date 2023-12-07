import { container } from 'tsyringe';
import { MessageService } from './lib/service/message.service';
import http from 'http';
import { Server, Socket } from 'socket.io';

const messageService = container.resolve(MessageService);

export const  setupSocketIO = async (server: http.Server) => {
    const io = new Server(server, {
        path: '/api/v1/chat/socket.io',
        cors: {
            origin: 'http://elevate.test',
            allowedHeaders: ['Authentication'],
            credentials: true,
        },
    });

    io.on('connection', (socket: Socket) => {
        onSocketConnection(io, socket); 
    });
};

const onSocketConnection = (io: Server, socket: Socket) => {
    console.log('User connected');

    socket.on('message', async (data) => {
        const { sender, recipient, text } = data;
        const message = await messageService.addMessage(sender, recipient, text);
        io.to(sender).to(recipient).emit('message', message);
    });

    socket.on('join', ({ sender, recipient }) => {
        const room = `${sender}-${recipient}`;
        socket.join(room);
        console.log(`Users ${sender} and ${recipient} joined the room ${room}`);
    });

    socket.on('disconnect', () => {
        handleSocketDisconnect(io, socket);
    });
};

const handleSocketDisconnect = (io: Server, socket: Socket) => {
    console.log('User disconnected');
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
        socket.leave(room);
        console.log(`User left room ${room}`);
    });
};
