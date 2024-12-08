import { useState, useEffect, ReactNode } from 'react';
import useWebSocket from 'react-use-websocket';
import { WebSocketContext } from '../context/WebSocketContext';
import useAuthStore from '../store/Auth';

interface WebSocketParams {
    url: string;
    queryParams?: { user_id: string };
}

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthStore();
    const [wsParams, setWsParams] = useState<WebSocketParams | null>(null);
    const {
        sendMessage,
        lastMessage,
        readyState,
        getWebSocket
    } = useWebSocket(
        wsParams?.url ?? '', {
        queryParams: wsParams?.queryParams,
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

    const ws = getWebSocket();

    useEffect(() => {
        if (ws) {
            ws.close();
        }
        if (user) {
            setWsParams({
                url: import.meta.env.VITE_WEBSOCKET_URL,
                queryParams: {
                    user_id: user.user_id,
                },
            })
        } else {
            setWsParams({
                url: import.meta.env.VITE_WEBSOCKET_URL
            });
        }
        
    }, [user, ws]);


    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
};