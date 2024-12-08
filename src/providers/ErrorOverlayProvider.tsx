import { ReactNode, useEffect, useState } from 'react';
import { ErrorOverlayContext } from '../context/ErrorOverlayContext';
import { useWebSocketContext } from '../context/WebSocketContext';
import { WebSocketError } from '../types/WebSocketError';
import { Toaster, toast } from 'react-hot-toast';
import { WebSocketPayload } from '../types/WebSocketPayload';
import useAuthStore from '../store/Auth';

interface ProviderParams {
    children: ReactNode;
}

export const ErrorOverlayProvider = ({ children }: ProviderParams) => {
    const { lastMessage } = useWebSocketContext();
    const [error, setError] = useState<WebSocketError | null>(null);
    const { signOut } = useAuthStore();

    useEffect(() => {
        if (lastMessage) {
            const { action, data } = JSON.parse(lastMessage.data) as WebSocketPayload;
            if (action === 'error') {
                setError(data as WebSocketError);
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        if (error) {
            if (error.type === 'logged_in_elsewhere') {
                signOut();
            }
            toast.error(error.message);
            setError(null);
        }
    }, [error]);
    
    return (
        <ErrorOverlayContext.Provider value={{ error, setError }}>
            <Toaster 
                position="top-center"
                toastOptions={{
                    error: {
                        duration: 5000,
                        style: {
                            background: 'red',
                            color: 'white',
                            animation: 'fadeIn ease 0.3s',
                        },
                        iconTheme: {
                            primary: 'white',
                            secondary: 'red',
                        }
                    }
                }}
            />
            {children}
        </ErrorOverlayContext.Provider>
    );
};
