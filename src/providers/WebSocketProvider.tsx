import { useState, useEffect, ReactNode } from 'react';
import useWebSocket from 'react-use-websocket';
import { WebSocketContext } from '../context/WebSocketContext';
import useAuthStore from '../store/Auth';


interface WebSocketParams {
    url: string;
    queryParams: { user_id: string };
}

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthStore();
    const [wsParams, setWsParams] = useState<WebSocketParams | null>(null);
    const { 
        sendMessage, 
        lastMessage, 
        readyState
    } = useWebSocket(
        wsParams?.url ?? '', {
        queryParams: wsParams?.queryParams,
        share: true,
        onOpen: () => {
            console.log(`User ${user?.user_id} connected to WebSocket`);
        },
        onClose: () => {
            console.warn(`User ${user?.user_id} disconnected from WebSocket`);
        },
        onMessage: (event) => {
            return;
            console.log('Message received:', event);
        },
        onError: (event) => {
            console.error('WebSocket error:', event);
        },
    });

    useEffect(() => {
        if (user) {
            setWsParams({
                url: import.meta.env.VITE_WEBSOCKET_URL,
                queryParams: {
                    user_id: user.user_id,
                },
            })
        } else {
            setWsParams(null);
        }
    }, [user]);


    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
};