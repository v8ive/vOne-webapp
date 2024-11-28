import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { create } from 'zustand';
import { createUser, getUserById } from '../utils/db';

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
    signup: (email: string, password: string, username: string) => Promise<void>;
    logout: () => void;
    initialize: () => void;
}

const useAuthStore = create<UserState>((set) => ({
    user: null,
    isLoading: true,
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

    signup: async (email, password, username) => {
        set({ isLoading: true, error: null });

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create user in your database
            await createUser(user.uid, username);

            set({ user, isLoading: false });
        } catch (error) {
            // Handle errors, e.g., display error messages to the user
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    initialize: async () => {
        setPersistence(auth, browserLocalPersistence);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserById(user.uid).then(userData => {
                    set({ user: { ...user, ...userData }, isLoading: false });
                }).catch(error => {
                    console.error('Error fetching user data:', error);
                    set({ user: null, isLoading: false, error: 'Failed to fetch user data' });
                });
            } else {
                set({ user: null, isLoading: false });
            }
        });
    }

    // ... other actions and state
}));

export default useAuthStore;