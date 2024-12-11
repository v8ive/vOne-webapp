import { createContext, useContext } from 'react';
import { User } from '../classes/User';

interface ContextParams {
    user: User | null;
    isLoading: boolean;
    signIn: () => void;
    signOut: () => void;
}

export const AuthContext = createContext<ContextParams | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
