'use client';

import React from 'react';

interface Room {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
}

interface ChatListProps {
  rooms: Room[];
  users: User[];
  onSelectRoom: (roomId: string) => void;
  onSelectUser: (userId: string) => void;
  selectedId?: string;
}

export function ChatList({ rooms, users, onSelectRoom, onSelectUser, selectedId }: ChatListProps) {
  return (
    <div className="w-72 h-full border-r bg-gray-50">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Rooms</h3>
        <div className="space-y-1">
          {rooms.length === 0 ? (
            <p className="text-gray-500 text-sm">No rooms available</p>
          ) : (
            rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={`w-full p-2 text-left rounded-lg hover:bg-gray-200 transition ${
                  selectedId === room.id ? 'bg-gray-200' : ''
                }`}
              >
                <div className="font-medium"># {room.name}</div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="p-4 border-t">
        <h3 className="text-lg font-medium mb-2">Direct Messages</h3>
        <div className="space-y-1">
          {users.length === 0 ? (
            <p className="text-gray-500 text-sm">No users available</p>
          ) : (
            users.map((user) => (
              <button
                key={user.id}
                onClick={() => onSelectUser(user.id)}
                className={`w-full p-2 text-left rounded-lg hover:bg-gray-200 transition ${
                  selectedId === user.id ? 'bg-gray-200' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <div className="font-medium">{user.name}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 