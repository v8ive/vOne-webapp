import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { User } from "../classes/User";
import { createUser } from "../utils/User";
import { supabase } from "../utils/supabase";

interface ProviderParams {
    children: ReactNode;
}

export const AuthProvider = ({ children }: ProviderParams) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === "SIGNED_OUT") {
                    setUser(null);
                    setIsLoading(false);
                    navigate("/");
                } else if (event === "SIGNED_IN") {
                    if (session) {
                        await fetchUser(session.user.id, session);
                    }
                    setIsLoading(false);
                } else if (event === "INITIAL_SESSION") {
                    if (session) {
                        await fetchUser(session?.user.id as string, session);
                    }
                    setIsLoading(false);
                } else if (session) {
                    await fetchUser(session.user.id, session);
                }
                console.log("Auth Event:", event, session);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchUser = async (id: string, session: Session) => {
        let fetchedUser = user;
        if (!fetchedUser) {
            fetchedUser = await new User(id).fetch();
            if (!fetchedUser) {
                fetchedUser = await createUser(
                    session?.user.user_metadata?.full_name ||
                    session?.user.user_metadata?.username,
                    session?.user.user_metadata?.avatar_url || null
                );
            }
        } else if (session?.user.id !== fetchedUser.id) {
            fetchedUser = await new User(session?.user.id as string).fetch();
        }

        if (fetchedUser) {
            setUser(fetchedUser);
            setIsLoading(false);
        }
        
    };

    const signIn = async () => {
        setIsLoading(true);
        await supabase.auth.signInWithOAuth({ provider: "discord" });
    };

    const signOut = async () => {
        setIsLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        } else {
            setUser(null);
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};