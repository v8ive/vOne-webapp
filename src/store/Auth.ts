import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';
import { extractDiscordIdFromAvatarUrl } from '../utils/discord';
import { User } from '../types/User';


interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    signInWithDiscord: () => void;
    signOut: () => void;
    initialize: () => void;
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
        
        if (error) {
            console.error('Error signing in with Discord:', error);
            set({ isLoading: false, error: error.message });
            return;
        } else if (!data) {
            console.error('No data received from Discord');
            set({ isLoading: false, error: 'No data received from Discord' });
            return;
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
            set({ user: null });
            return;
        }

        const user = session.data.session?.user;
        if (!user) {
            set({ user: null });
            return;
        }

        // Check if user exists in the database
        let dbUser = await supabase
            .from('users')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (!dbUser.data) {
            // User doesn't exist, create them in the database
            const { error } = await supabase
                .from('profiles')
                .insert([{
                    discord_id: extractDiscordIdFromAvatarUrl(user.user_metadata?.avatar_url),
                    profile_picture: user.user_metadata?.avatar_url,
                    username: user.user_metadata?.full_name,
                    email: user.email,
                }])
                .single();
            dbUser = await supabase
                .from('users')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (error) {
                console.error('Error creating user:', error);
                // Handle the error, e.g., show an error message to the user
                return;
            }
            
        }

        set({ user: { 
            ...user,
            ...dbUser.data,
        } });
    }
}));

export default useAuthStore;