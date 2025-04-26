'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useSocket } from '@/lib/useSocket';

// Create the socket context
const SocketContext = createContext<ReturnType<typeof useSocket> | null>(null);

// Provider component
export function SocketProvider({ children }: { children: ReactNode }) {
  const socketValue = useSocket();
  
  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
}

// Hook to use the socket context
export function useSocketContext() {
  const context = useContext(SocketContext);
  
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  
  return context;
} 