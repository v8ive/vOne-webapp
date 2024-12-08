import { createContext, useContext } from 'react';
import { UserStatePayload } from '../types/UserStatePayload';

interface ContextParams {
    users: Record<string, UserStatePayload>;
}

export const UsersContext = createContext<ContextParams | null>(null);

export const useUsersContext = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useContext must be used within a Provider');
    }
    return context;
};
