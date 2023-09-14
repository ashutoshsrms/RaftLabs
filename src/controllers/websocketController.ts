import { Server, Socket } from 'socket.io';

export const initializeWebSocket = (io: Server) => {
  const resourceNamespace = io.of('/resources');

  resourceNamespace.on('connection', (socket: Socket) => {
    console.log('A user connected via WebSocket');

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
    socket.emit('message', 'Welcome to the WebSocket server!');

    socket.on('chat message', (message: string) => {
      resourceNamespace.emit('chat message', message);
    });
  });
};
