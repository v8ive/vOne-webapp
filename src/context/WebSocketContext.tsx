import { createContext, useContext } from 'react';

interface WebSocketContextParams {
    sendMessage: (message: string) => void;
    lastMessage: MessageEvent | null;
    readyState: number;
}

export const WebSocketContext = createContext<WebSocketContextParams | null>(null);

export const useWebSocketContext = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocketContext must be used within a WebSocketProvider');
    }
    return context;
};