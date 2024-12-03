import { createClient, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { UserProfile } from '../types/UserData';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface ExtendedUser extends User {
    profile?: UserProfile | null;
}

interface UserState {
    user: ExtendedUser | null;
    isLoading: boolean;
    error: string | null;
    signInWithDiscord: () => void;
    signUp: (email: string, username: string, password: string) => void;
    signOut: () => void;
    initialize: () => void;
}

async function getUserProfile(userId: string) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching user profile data:', error);
        return null;
    }

    return data;
}

const useAuthStore = create<UserState>((set) => ({
    user: null,
    userProfile: null,
    isLoading: false,
    error: null,

    signInWithDiscord: async () => {
        set({ isLoading: true, error: null });
        
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord'
        });
        console.log(data, error);

    },

    signUp: async (email, username, password) => {
        set({ isLoading: true, error: null });

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            if (error) {
                return set({ error: error.message, isLoading: false });
            }

            if (!data) {
                throw new Error('No Data. Sign up failed');
            } else if (!data.user) {
                throw new Error('User not found. Sign up failed');
            }

            await supabase
                .from('profiles')
                .insert([{ 
                    user_id: data.user.id,
                    username,
                    email,
                }]);

            const userProfile = await getUserProfile(data.user.id);

            set({ user: { ...data.user, profile: userProfile }, isLoading: false });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    signOut: async () => {
        set({ isLoading: true, error: null });

        try {
            await supabase.auth.signOut();
            set({ user: null, isLoading: false });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    initialize: async () => {
        const session = await supabase.auth.getSession();
        if (!session) {
            return;
        }
        if (session.data.session?.user) {
            const userProfile = await getUserProfile(session.data.session.user.id);
            set({ user: { ...session.data.session.user, profile: userProfile } });
        }
    }
}));

export default useAuthStore;