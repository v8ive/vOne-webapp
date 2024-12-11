import { createContext, useContext } from 'react';
import { Presence } from '../types/Presence';

interface ContextParams {
    presences: Presence[];
    userPresence: Presence | null;
    setUserPresence: (presence: Presence) => void;
    connected: boolean;
}

export const PresenceContext = createContext<ContextParams | null>(null);

export const usePresence = () => {
    const context = useContext(PresenceContext);
    if (!context) {
        throw new Error('useContext must be used within a Provider');
    }
    return context;
};
