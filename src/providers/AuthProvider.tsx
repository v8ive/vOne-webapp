import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { User } from '../classes/User';
import { createUser } from '../utils/User';
import { supabase } from '../utils/supabase';

interface ProviderParams {
    children: ReactNode;
}

export const AuthProvider = ({ children }: ProviderParams) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [session, setSession] = useState<Session | null>(null);
    const navigate = useNavigate();

    const fetchUser = async (id: string) => {
        let fetchedUser;
        fetchedUser = await new User(id).fetch()
        if (!fetchedUser) {
            fetchedUser = await createUser(
                session?.user.user_metadata?.full_name || session?.user.user_metadata?.username,
                session?.user.user_metadata?.avatar_url || null
            )
        }
        return setUser(fetchedUser)

    }

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setSession(null)
                    setUser(null)
                    setIsLoading(false)
                    navigate('/')
                } else if (session) {
                    fetchUser(session.user.id)
                    setSession(session)
                }
            })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (session) {
            fetchUser(session.user.id)
        } else if (user) {
            setUser(null)
        }
    }, [session])

    const signIn = async () => {
        setIsLoading(true);
        await supabase.auth.signInWithOAuth({ provider: 'discord' })
    };

    const signOut = async () => {
        setIsLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error signing out:', error)
        else {
            setUser(null);
            setIsLoading(false);
        };
    };

    if (isLoading) {
        setIsLoading(false)
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
