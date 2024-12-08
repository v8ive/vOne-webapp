
export interface UserStatePayload {
    user_id: string;
    user_state: {
        username: string;
        status: 'online' | 'offline' | 'away';
        last_online: number;
    };
    is_guest: boolean;
}