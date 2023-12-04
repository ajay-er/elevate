// socket.ts
import { Server } from 'socket.io';
import http  from 'http';

const initializeSocket = (httpServer: http.Server) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
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
};

export default initializeSocket;
