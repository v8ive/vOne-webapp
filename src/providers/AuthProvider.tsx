import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { User } from "../classes/User";
import { supabase } from "../utils/supabase";

interface ProviderParams {
    children: ReactNode;
}

export const AuthProvider = ({ children }: ProviderParams) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Initialize in loading state
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data, error }) => {
            if (data?.session) {
                await fetchUser(data.session.user.id, data.session);
            } else if (error) {
                console.error("Error fetching session:", error);
            }
            setIsLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === "SIGNED_OUT") {
                    setUser(null);
                    navigate("/");
                } else if (session) {
                    await fetchUser(session.user.id, session);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const fetchUser = async (id: string, session: Session) => {
        try {
            const user = await new User(
                id,
                session.user?.user_metadata?.full_name as string,
                session.user?.user_metadata?.avatar_url as string
            ).fetch();
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
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