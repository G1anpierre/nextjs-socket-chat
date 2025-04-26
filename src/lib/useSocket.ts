import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  content: string;
  sender: string;
  room?: string;
  recipient?: string;
  timestamp: string;
}

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [roomMessages, setRoomMessages] = useState<Record<string, Message[]>>({});
  const [directMessages, setDirectMessages] = useState<Record<string, Message[]>>({});
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  // Initialize socket connection
  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === 'undefined') return;

    // Connect to the same host/port as the page
    const socketInstance = io();

    socketInstance.on('connect', () => {
      console.log('Connected to Socket.IO server');
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      setConnected(false);
    });

    setSocket(socketInstance);

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Handle room messages
  useEffect(() => {
    if (!socket) return;

    const handleRoomMessage = (message: Message) => {
      if (message.room) {
        setRoomMessages((prev) => {
          const roomId = message.room as string;
          const roomMessageList = prev[roomId] || [];
          return {
            ...prev,
            [roomId]: [...roomMessageList, message],
          };
        });
      }
    };

    socket.on('room-message', handleRoomMessage);

    return () => {
      socket.off('room-message', handleRoomMessage);
    };
  }, [socket]);

  // Handle direct messages
  useEffect(() => {
    if (!socket) return;

    const handleDirectMessage = (message: Message) => {
      if (message.sender) {
        const userId = message.sender;
        setDirectMessages((prev) => {
          const userMessageList = prev[userId] || [];
          return {
            ...prev,
            [userId]: [...userMessageList, message],
          };
        });
      }
    };

    socket.on('direct-message', handleDirectMessage);

    return () => {
      socket.off('direct-message', handleDirectMessage);
    };
  }, [socket]);

  // Join a room
  const joinRoom = useCallback((roomId: string) => {
    if (socket && connected) {
      socket.emit('join-room', roomId);
      setCurrentRoom(roomId);
    }
  }, [socket, connected]);

  // Leave a room
  const leaveRoom = useCallback(() => {
    if (socket && connected && currentRoom) {
      socket.emit('leave-room', currentRoom);
      setCurrentRoom(null);
    }
  }, [socket, connected, currentRoom]);

  // Send a message to the current room
  const sendRoomMessage = useCallback((content: string) => {
    if (socket && connected && currentRoom) {
      const message: Message = {
        content,
        sender: socket.id || '',
        room: currentRoom,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send-room-message', { roomId: currentRoom, message });
    }
  }, [socket, connected, currentRoom]);

  // Send a direct message to a user
  const sendDirectMessage = useCallback((recipientId: string, content: string) => {
    if (socket && connected) {
      const message: Message = {
        content,
        sender: socket.id || '',
        recipient: recipientId,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send-direct-message', { recipientId, message });
      
      // Also save to our local state
      setDirectMessages((prev) => {
        const userMessageList = prev[recipientId] || [];
        return {
          ...prev,
          [recipientId]: [...userMessageList, message],
        };
      });
    }
  }, [socket, connected]);

  return {
    socket,
    connected,
    currentRoom,
    roomMessages,
    directMessages,
    joinRoom,
    leaveRoom,
    sendRoomMessage,
    sendDirectMessage,
  };
}; 