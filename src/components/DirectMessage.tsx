'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSocketContext } from './SocketProvider';

interface DirectMessageProps {
  recipientId: string;
  recipientName?: string;
}

export function DirectMessage({ recipientId, recipientName = 'User' }: DirectMessageProps) {
  const { sendDirectMessage, directMessages, connected, socket } = useSocketContext();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [directMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendDirectMessage(recipientId, message);
      setMessage('');
    }
  };

  const messages = directMessages[recipientId] || [];
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-4 border-b">
        <h2 className="text-xl font-semibold">Chat with {recipientName}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col max-w-[70%] p-3 rounded-lg ${
                socket && msg.sender === socket.id
                  ? 'ml-auto bg-blue-500 text-white' 
                  : 'bg-gray-200'
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs self-end text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form 
        onSubmit={handleSendMessage} 
        className="p-4 border-t flex gap-2"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!connected}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!connected || !message.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
} 