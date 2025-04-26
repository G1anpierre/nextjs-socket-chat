'use client';

import React, { useState, useEffect } from 'react';
import { useSocketContext } from './SocketProvider';
import { ChatList } from './ChatList';
import { ChatRoom } from './ChatRoom';
import { DirectMessage } from './DirectMessage';

// Sample data (in a real app, this would come from a database or API)
const SAMPLE_ROOMS = [
  { id: 'general', name: 'General' },
  { id: 'random', name: 'Random' },
  { id: 'support', name: 'Support' },
];

export function Chat() {
  const { socket, connected } = useSocketContext();
  const [activeChat, setActiveChat] = useState<{ type: 'room' | 'direct', id: string } | null>(null);
  const [users, setUsers] = useState<Array<{ id: string, name: string }>>([]);

  // Update users list when new users connect
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      // In a real app, you would fetch a list of connected users from the server
      // For demo purposes, we'll just add a few random users
      setUsers([
        { id: 'user1', name: 'Alice' },
        { id: 'user2', name: 'Bob' },
        { id: 'user3', name: 'Charlie' },
      ]);
    };

    // Initial setup
    if (connected) {
      handleConnect();
    }

    socket.on('connect', handleConnect);

    return () => {
      socket.off('connect', handleConnect);
    };
  }, [socket, connected]);

  const handleSelectRoom = (roomId: string) => {
    setActiveChat({ type: 'room', id: roomId });
  };

  const handleSelectUser = (userId: string) => {
    setActiveChat({ type: 'direct', id: userId });
  };

  // Find the name of the selected room or user
  const getActiveChatName = () => {
    if (!activeChat) return '';
    
    if (activeChat.type === 'room') {
      const room = SAMPLE_ROOMS.find(r => r.id === activeChat.id);
      return room?.name || '';
    } else {
      const user = users.find(u => u.id === activeChat.id);
      return user?.name || '';
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <ChatList
        rooms={SAMPLE_ROOMS}
        users={users}
        onSelectRoom={handleSelectRoom}
        onSelectUser={handleSelectUser}
        selectedId={activeChat?.id}
      />
      
      <div className="flex-1 flex flex-col">
        {!connected && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 rounded-lg bg-gray-100">
              <h3 className="text-lg font-medium text-gray-700">Connecting to chat server...</h3>
              <div className="mt-4 animate-pulse">
                <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
        )}
        
        {connected && !activeChat && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <h3 className="text-xl font-medium text-gray-700">Select a room or user to start chatting</h3>
            </div>
          </div>
        )}
        
        {connected && activeChat && activeChat.type === 'room' && (
          <ChatRoom 
            roomId={activeChat.id} 
            roomName={getActiveChatName()}
          />
        )}
        
        {connected && activeChat && activeChat.type === 'direct' && (
          <DirectMessage 
            recipientId={activeChat.id} 
            recipientName={getActiveChatName()}
          />
        )}
      </div>
    </div>
  );
} 