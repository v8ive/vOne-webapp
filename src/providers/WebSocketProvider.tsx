import { ReactNode, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { WebSocketContext } from '../context/WebSocketContext';
import useAuthStore from '../store/Auth';

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthStore();
    
    const {
        sendMessage,
        lastMessage,
        readyState,
        getWebSocket
    } = useWebSocket(
        import.meta.env.VITE_WEBSOCKET_URL, {
        queryParams: user ? { user_id: user.user_id } : undefined,
        share: true,
        onOpen: () => {
            console.log(`Connected to WebSocket`);
        },
        onClose: () => {
            console.warn(`Disconnected from WebSocket`);
        },
        onMessage: (event) => {
            const { action } = JSON.parse(event.data);
            if (action === 'pong') {
                console.info('Pong received');
            } else {
                console.info('Message received : ' + action);
            }
        },
        onError: (event) => {
            console.error('WebSocket error:', event);
        },
        heartbeat: {
            message: JSON.stringify({ action: 'ping' }),
            returnMessage: JSON.stringify({ action: 'pong' }),
            timeout: 60000, // 1 minute, if no response is received, the connection will be closed
            interval: 25000, // every 25 seconds, a ping message will be sent
        },
    });

    useEffect(() => {
        if (getWebSocket && !user) {
            getWebSocket()?.close();
        }
    }, [user]);


    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
};