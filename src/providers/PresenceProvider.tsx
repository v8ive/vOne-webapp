import { ReactNode, useEffect, useState } from "react";
import { PresenceContext } from "../context/PresenceContext";
import { Presence } from "../types/Presence";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../utils/supabase";
import {
    RealtimeChannel,
    RealtimePresenceJoinPayload,
    RealtimePresenceLeavePayload,
} from "@supabase/supabase-js";

interface ProviderParams {
    children: ReactNode;
}

export const PresenceProvider = ({ children }: ProviderParams) => {
    const [presences, setPresences] = useState<Presence[]>([]);
    const [userPresence, setUserPresence] = useState<Presence | null>(null);
    const { user, isLoading } = useAuth();

    const [channel, setChannel] = useState<RealtimeChannel | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        if (!user || isLoading) {
            // Clear presences and set userPresence to a default offline state when user is not logged in
            setPresences([]);
            setConnected(false);
            return;
        }

        const publicPresenceChannel = supabase.channel("public:presence", {
            config: {
                private: user ? true : false,
                presence: {
                    key: user.id,
                },
            },
        });
        setChannel(publicPresenceChannel);

        // Fetch initial presence data for the user
        const fetchPresence = async () => {
            const { data, error } = await supabase
                .from("presence")
                .select()
                .eq("user_id", user.id)
                .single();
            if (error) {
                return null;
            } else {
                return data;
            }
        };

        fetchPresence().then(async (data) => {
            if (data) {
                const now = new Date().getTime();
                // Update presence status to 'online' if not locked
                if (!data.status_locked) {
                    await supabase
                        .from("presence")
                        .upsert({
                            status: "online",
                            last_online: now,
                        })
                        .eq("user_id", user.id);
                }
                // Set user presence with fetched or updated data
                setUserPresence({
                    username: user.username,
                    status: data.status_locked ? data.status : "online",
                    last_online: data.status_locked
                        ? data.last_online
                        : now,
                    avatar_url: user.avatar_url,
                    user_id: user.id,
                });
            }
        });

        // Helper function to update presence list with new presence data
        const updatePresenceList = (newPresence: Presence) => {
            setPresences((prevPresences) => {
                // Check if presence with the same user_id already exists
                const existingPresenceIndex = prevPresences.findIndex(
                    (p) => p.user_id === newPresence.user_id
                );
                if (existingPresenceIndex > -1) {
                    // Update existing presence
                    const updatedPresences = [...prevPresences];
                    updatedPresences[existingPresenceIndex] = newPresence;
                    return updatedPresences;
                } else {
                    // Add new presence
                    return [...prevPresences, newPresence];
                }
            });
        };

        const presenceListener = () => {
            const presenceState = publicPresenceChannel.presenceState();
            Object.values(presenceState).forEach((presence) => {
                updatePresenceList(presence[0] as Presence);
            });
        };

        const joinListener = (
            e: RealtimePresenceJoinPayload<{ [key: string]: unknown }>
        ) => {
            Object.values(e.newPresences).forEach((presence) => {
                updatePresenceList(presence as unknown as Presence);
            });
        };

        const leaveListener = (
            e: RealtimePresenceLeavePayload<{ [key: string]: unknown }>
        ) => {
            Object.values(e.leftPresences).forEach((presence) => {
                setPresences((prevPresences) =>
                    prevPresences.filter((p) => p.user_id !== presence.user_id)
                );
            });
        };

        // Subscribe to presence events and track user's presence
        publicPresenceChannel
            .on("presence", { event: "sync" }, presenceListener)
            .on("presence", { event: "join" }, (e) => joinListener(e))
            .on("presence", { event: "leave" }, (e) => leaveListener(e))
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED" && userPresence) {
                    const presenceTrackStatus =
                        await publicPresenceChannel.track(userPresence);
                    if (presenceTrackStatus === "ok") {
                        setConnected(true);
                    }
                } else {
                    setChannel(null);
                    setConnected(false);
                }
            });

        return () => {
            publicPresenceChannel.unsubscribe();
            setConnected(false);
            setChannel(null);
        };
    }, [user, isLoading]);

    useEffect(() => {
        if (!user || !userPresence || !channel) {
            return;
        }

        const setStatus = async () => {
            const { error } = await supabase
                .from("presence")
                .upsert({
                    status: userPresence?.status,
                    last_online: userPresence?.last_online,
                })
                .eq("user_id", user.id);
            if (error) {
                console.error("Error setting user presence:", error);
                return;
            }
            await channel.track(userPresence);
        };

        setStatus();
    }, [userPresence, channel, user]);

    return (
        <PresenceContext.Provider
            value={{ presences, userPresence, setUserPresence, connected }}
        >
            {children}
        </PresenceContext.Provider>
    );
};