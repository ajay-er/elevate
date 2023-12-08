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

let users: any[] = [];

const addUser = (userId: any, socketId: any) => {
    // eslint-disable-next-line no-unused-expressions
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId: any) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: any) => {
    return users.find((user) => user.userId === userId);
};

const onSocketConnection = (io: Server, socket: Socket) => {
    console.log('User connected');    

    socket.on('addUser', (userId:any) => {
        console.log(userId,'user added');
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    socket.on('message', async (data:any) => {
        try {
            const { sender, recipient, text } = data;
            const message = await messageService.addMessage(sender, recipient, text);
            const user1 = getUser(sender);
            const user2 = getUser(recipient);

            if (user1?.socketId) {
                io.to(user1.socketId).emit('receiveMessage', message);
            }

            if (user2?.socketId) {
                io.to(user2.socketId).emit('receiveMessage', message);
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
};

