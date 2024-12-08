import { ReactNode, useEffect, useState } from 'react';
import { WebSocketPayload } from '../types/WebSocketPayload';
import { useWebSocketContext } from '../context/WebSocketContext';
import { UsersContext } from '../context/UsersContext';
import { UserState } from '../types/UserState';
import { UserStatePayload } from '../types/UserStatePayload';

interface ProviderParams {
    children: ReactNode;
}

export const UsersProvider = ({ children }: ProviderParams) => {
    const { lastMessage } = useWebSocketContext();
    const [users, setUsers] = useState<Record<string, UserStatePayload>>({});

    useEffect(() => {
        if (lastMessage) {
            const { action, data } = JSON.parse(lastMessage.data) as WebSocketPayload;
            if (action === 'user_connected') {
                setUsers((users) => {
                    const updatedUsers = { ...users };
                    if ('user_id' in data) {
                        if (typeof data.user_id === 'string') {
                            updatedUsers[data.user_id] = data as UserStatePayload;
                        }
                    }
                    return updatedUsers;
                });
            } else if (action === 'user_disconnected') {
                if ('is_guest' in data && data.is_guest) {
                    setUsers((users) => {
                        const updatedUsers = { ...users };
                        if (typeof data.user_id === 'string') {
                            delete updatedUsers[data.user_id];
                        }
                        return updatedUsers;
                    });
                } else {
                    setUsers((users) => {
                        const updatedUsers = { ...users };
                        if ('user_id' in data && typeof data.user_id === 'string' && data.user_id in updatedUsers) {
                            updatedUsers[data.user_id] = { ...updatedUsers[data.user_id], user_state: { ...updatedUsers[data.user_id].user_state, status: 'offline' } };
                        }
                        return updatedUsers;
                    });
                }
            } else if (action === 'user_state') {
                setUsers((users) => {
                    const updatedUsers = { ...users };
                    if ('user_id' in data && typeof data.user_id === 'string' && data.user_id in updatedUsers) {
                        updatedUsers[data.user_id] = { ...updatedUsers[data.user_id], ...data.user_state };
                    }
                    return updatedUsers;
                });
                // Initial user states received from the server
            } else if (action === 'user_states') {
                setUsers((users) => {
                    const updatedUsers: Record<string, UserStatePayload> = {};
                    
                    for (const [userId, userData] of Object.entries(data)) {
                        if (typeof userId === 'string') {
                            updatedUsers[userId] = {
                                ...users[userId],
                                user_id: userId,
                                user_state: userData as UserState,
                                is_guest: userData.is_guest
                            };
                        }
                    }
                    return { ...users, ...updatedUsers };
                });
            }

        }
    }, [lastMessage]);

    useEffect(() => {
        Object.keys(users).forEach((userId) => {
            if (users[userId].user_state === undefined) {
                setUsers((users) => {
                    const updatedUsers = { ...users };
                    delete updatedUsers[userId];
                    return updatedUsers;
                }
                );
            } else if (Date.now() - users[userId].user_state.last_online > 30000) {
                setUsers((users) => {
                    const updatedUsers = { ...users };
                    updatedUsers[userId] = { ...users[userId], user_state: { ...users[userId].user_state, status: 'offline' } };
                    return updatedUsers;
                });
            }
        });
    }, []);

    return (
        <UsersContext.Provider value={{ users }}>
            {children}
        </UsersContext.Provider>
    );
};
