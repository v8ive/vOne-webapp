import { ReactNode, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { WebSocketContext } from '../context/WebSocketContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [ URL, setURL ] = useState<string | null>(null);
    
    const {
        sendMessage,
        lastMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(
        URL, {
        queryParams: user ? { user_id: user.id } : undefined,
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
            } else if (action === 'logged_in_elsewhere') {
                navigate('/')
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
        if (user) {
            setURL(import.meta.env.VITE_WEBSOCKET_URL);
        } else {
            if (readyState === 1) {
                getWebSocket()?.close();
            }
            setURL(null);
        }
    }, [user]);

    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
};