# Next.js Socket.io Chat Application

![Chat Application Screenshot](https://github.com/G1anpierre/nextjs-socket-chat/raw/main/public/chat-preview.png)

A modern real-time chat application built with Next.js and Socket.io featuring chat rooms and direct messaging capabilities.

## Features

- **Real-time Communication**: Instant messaging using Socket.io
- **Chat Rooms**: Create and join public chat rooms
- **Direct Messaging**: Private conversations between users
- **User Authentication**: Secure login and registration system
- **Message History**: Persistent message storage
- **Online Status**: See who's currently online
- **Message Delivery Status**: Know when messages are delivered and read
- **Responsive Design**: Works on desktop and mobile devices
- **Typing Indicators**: See when someone is typing a message

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Real-time Communication**: Socket.io
- **Styling**: Tailwind CSS, HeadlessUI
- **State Management**: React Context API
- **Deployment**: Vercel

## Architecture

The application uses a custom server setup with Next.js and Socket.io to handle real-time communication. The server is written in TypeScript and runs both the Next.js application and the Socket.io server on the same port for simplified deployment.

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

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
   DATABASE_URL=your_database_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

- Users register or login to access the chat application
- They can join existing chat rooms or create new ones
- Direct messaging allows private conversations between users
- The server manages socket connections and broadcasts messages to the appropriate recipients
- Message history is stored in the database for persistence

## Socket Events

- `connection`: Establishes a new socket connection
- `disconnect`: Handles user disconnection
- `join_room`: Join a specific chat room
- `leave_room`: Leave a chat room
- `message_room`: Send a message to a chat room
- `direct_message`: Send a direct message to a specific user
- `typing`: Indicate that a user is typing
- `read_receipt`: Mark messages as read

## Project Structure

- `src/app/`: Next.js app router pages and layouts
- `src/components/`: Reusable UI components
- `src/context/`: React context for state management
- `src/lib/`: Utility functions and hooks
- `src/types/`: TypeScript type definitions
- `server.ts`: Custom server handling Next.js and Socket.io

## Deployment

The application can be deployed to Vercel with zero configuration. For custom server deployment, follow these steps:

1. Build the application: `npm run build`
2. Start the production server: `npm start`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.