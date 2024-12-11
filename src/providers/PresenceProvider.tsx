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
            return;
        }
        const publicPresenceChannel = supabase.channel("public:presence", {
            config: {
                private: false,
                presence: {
                    key: "presence_channel",
                },
            },
        });
        setChannel(publicPresenceChannel); // Initialize channel here

        const fetchPresence = async () => {
            const { data, error } = await supabase
                .from("presence")
                .select()
                .eq("user_id", user.id)
                .single();
            if (error) {
                console.error("Error fetching user presence:", error);
                return null;
            } else {
                return data;
            }
        };

        fetchPresence().then((data) => {
            if (data) {
                setUserPresence({
                    username: user.username,
                    status: data.status,
                    last_online: data.last_online,
                    avatar_url: user.avatar_url,
                    user_id: user.id,
                });
            }
        });

        const presenceListener = () => {
            const pList: Presence[] = [];
            console.log("presenceListener", Object.values(publicPresenceChannel.presenceState()));
            Object.values(
                publicPresenceChannel.presenceState()
            ).map((presence) => {
                // if the user is not already in the list, add them
                if (
                    pList
                        .map((p) => p.user_id)
                        .indexOf((presence[0] as Presence).user_id) === -1
                ) {
                    pList.push(presence[0] as Presence);
                }
            });
            setPresences(pList);
        };

        const joinListener = (
            e: RealtimePresenceJoinPayload<{ [key: string]: unknown }>
        ) => {
            const pList: Presence[] = [];
            console.log("joinListener", e);
            Object.values(e.newPresences).map((presence) => {
                pList.push(presence as unknown as Presence);
            });
            setPresences(pList);
        };

        const leaveListener = (
            e: RealtimePresenceLeavePayload<{ [key: string]: unknown }>
        ) => {
            const pList: Presence[] = [];
            Object.values(e.leftPresences).map((presence) => {
                if (
                    pList
                        .map((p) => p.user_id)
                        .indexOf(presence.user_id as string) === -1
                ) {
                    pList.push(presence as unknown as Presence);
                }
            });
            setPresences(pList);
        };

        publicPresenceChannel
            .on("presence", { event: "sync" }, presenceListener)
            .on("presence", { event: "join" }, (e) => joinListener(e))
            .on("presence", { event: "leave" }, (e) => leaveListener(e))
            .subscribe(async (status) => {
                if (status !== "SUBSCRIBED") {
                    console.log("Error subscribing to presence channel", status);
                    setChannel(null);
                    setConnected(false);
                    return;
                }

                if (userPresence) {
                    const presenceTrackStatus =
                        await publicPresenceChannel.track(userPresence);
                    console.log("presenceTrackStatus", presenceTrackStatus);
                    if (presenceTrackStatus === "ok") {
                        setConnected(true);
                    }
                }
            });

        return () => {
            publicPresenceChannel.unsubscribe();
            setConnected(false);
            setChannel(null); // Reset channel on unmount
        };
    }, [user, isLoading]);

    useEffect(() => {
        if (!user || !userPresence || !channel || isLoading) {
            return;
        }
        console.log("Setting user presence", userPresence);

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
            const response = await channel.send({
                type: "presence",
                event: "sync",
            });
            console.log("response", response);
        };

        setStatus();
    }, [userPresence, channel, user, isLoading]);

    return (
        <PresenceContext.Provider
            value={{ presences, userPresence, setUserPresence, connected }}
        >
            {children}
        </PresenceContext.Provider>
    );
};