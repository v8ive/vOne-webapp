import PresenceListItem from "./presenceListItem";
import { Box, Flex, Spinner } from "@radix-ui/themes";
import { usePresence } from "../../context/PresenceContext";
import { useAuth } from "../../context/AuthContext";
import { Presence } from "../../types/Presence";
import { supabase } from "../../utils/supabase";
import { useEffect, useState } from "react";

type PresenceListProps = {
    showOffline?: boolean;
};

const PresenceList: React.FC<PresenceListProps> = ({ showOffline = false }) => {
    const { presences } = usePresence();
    const { user } = useAuth();
    const [presenceList, setPresenceList] = useState<Presence[]>([]);

    useEffect(() => {
        const fetchPresences = async () => {
            const filteredPresences = presences.filter(
                (presence) => showOffline || presence.status !== "offline"
            );

            const { data: users, error: usersError } = await supabase
                .from("users")
                .select();
            if (usersError) {
                console.error("Error fetching users:", usersError);
                return;
            }

            if (users && user) {
                await Promise.all(
                    users.map(async (dbUser) => {
                        let presence = filteredPresences.find(
                            (p) => p.user_id === dbUser.id
                        );
                        if (!presence && showOffline) {
                            const { data, error } = await supabase
                                .from("presence")
                                .select()
                                .eq("user_id", dbUser.id)
                                .single();

                            if (error) {
                                console.error("Error fetching presence:", error);
                                return;
                            }

                            if (data) {
                                presence = {
                                    user_id: dbUser.id,
                                    status: data.status,
                                    last_online: data.last_online,
                                    username: dbUser.username,
                                    avatar_url: dbUser.avatar_url,
                                };
                                filteredPresences.push(presence);
                            }
                        }
                    })
                );
            }

            setPresenceList(filteredPresences);
        };

        fetchPresences();
    }, [presences, showOffline, user]);

    if (!user) {
        return (
            <Flex
                align="center"
                justify="center"
                style={{ marginTop: "25px" }}
            >
                <Spinner size={"3"} />
            </Flex>
        );
    }

    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "10px",
            }}
        >
            {presenceList.map((presence: Presence) => (
                <PresenceListItem key={presence.user_id} presence={presence} />
            ))}
        </Box>
    );
};

export default PresenceList;