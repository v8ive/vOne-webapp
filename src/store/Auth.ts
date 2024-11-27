import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { create } from 'zustand';

interface User {
    uid: string;
    email: string | null;
    // ... other user properties
}

interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const useAuthStore = create<UserState>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            set({ user, isLoading: false });
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: (error as Error).message, isLoading: false });
            } else {
                set({ error: 'An unknown error occurred', isLoading: false });
            }
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });

        try {
            await signOut(auth);
            set({ user: null, isLoading: false });
        } catch (error) {
            if (error instanceof Error) {
                set({ error: error.message, isLoading: false });
            } else {
                set({ error: 'An unknown error occurred', isLoading: false });
            }
        }
    },

    // ... other actions and state
}));

export default useAuthStore;