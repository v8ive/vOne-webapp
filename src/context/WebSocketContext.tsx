import { createContext, useContext } from 'react';

export const WebSocketContext = createContext<{
    sendMessage: (message: string) => void;
    lastMessage: MessageEvent | null;
    readyState: number;
} | null>(null);

export const useWebSocketContext = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocketContext must be used within a WebSocketProvider');
    }
    return context;
};