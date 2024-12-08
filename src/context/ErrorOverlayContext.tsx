import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { WebSocketError } from '../types/WebSocketError';

interface ContextParams {
    error: WebSocketError | null;
    setError: Dispatch<SetStateAction<WebSocketError | null>>;
}

export const ErrorOverlayContext = createContext<ContextParams | null>(null);

export const useErrorContext = () => {
    const context = useContext(ErrorOverlayContext);
    if (!context) {
        throw new Error('useContext must be used within a Provider');
    }
    return context;
};
