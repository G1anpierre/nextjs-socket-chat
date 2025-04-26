# Next.js Socket.io Chat Application

A real-time chat application built with Next.js and Socket.io that features chat rooms and direct messaging capabilities.

## Features
- Real-time messaging with Socket.io
- Chat rooms and direct messaging
- TypeScript for type safety
- Custom server integration
- Responsive UI

## Architecture
The application uses a custom server setup with Next.js and Socket.io to handle real-time communication. The server is written in TypeScript and serves both the Next.js application and the Socket.io server on the same port.

## Getting Started
1. **Clone the repository**
   ```bash
   git clone https://github.com/G1anpierre/nextjs-socket-chat.git
   cd nextjs-socket-chat
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works
- Users can join chat rooms and send messages in real-time.
- Direct messaging allows users to send private messages to each other.
- The server broadcasts messages to all clients in a room or directly to a specific user.

## Socket Events
- `join_room`: Join a specific chat room.
- `leave_room`: Leave a chat room.
- `message_room`: Send a message to a chat room.
- `direct_message`: Send a direct message to a specific user.

## Project Structure
- `src/app/`: Contains the main application components.
- `src/components/`: Contains reusable UI components.
- `server.ts`: The custom server file handling both Next.js and Socket.io.

## License
This project is licensed under the MIT License. 