import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';
import type { Socket as SocketIOSocket } from 'socket.io';

// Define the message type for better typing
interface Message {
  content: string;
  sender: string;
  room?: string;
  recipient?: string;
  timestamp: string;
}

const dev = process.env.NODE_ENV !== 'production';
const port = 3000;

// Create Next.js app
const app = next({ dev });
const nextHandler = app.getRequestHandler();

app.prepare().then(() => {
  // Create HTTP server
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || '', true);
    nextHandler(req, res, parsedUrl);
  });

  // Initialize Socket.io server
  const io = new Server(server);

  // Socket.io connection logic
  io.on('connection', (socket: SocketIOSocket) => {
    console.log(`Client connected: ${socket.id}`);
    
    // Handle joining a chat room
    socket.on('join-room', (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
      
      // Notify room that a new user has joined
      socket.to(roomId).emit('user-joined', { userId: socket.id });
    });
    
    // Handle leaving a chat room
    socket.on('leave-room', (roomId: string) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room: ${roomId}`);
      
      // Notify room that a user has left
      socket.to(roomId).emit('user-left', { userId: socket.id });
    });
    
    // Handle sending a message to a room
    socket.on('send-room-message', ({ roomId, message }: { roomId: string; message: Message }) => {
      console.log(`Message sent to room ${roomId}:`, message);
      io.to(roomId).emit('room-message', {
        ...message,
        timestamp: new Date().toISOString(),
      });
    });
    
    // Handle sending a direct message to a specific user
    socket.on('send-direct-message', ({ recipientId, message }: { recipientId: string; message: Message }) => {
      console.log(`Direct message sent to ${recipientId}:`, message);
      io.to(recipientId).emit('direct-message', {
        ...message,
        timestamp: new Date().toISOString(),
      });
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  // Start the server
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
