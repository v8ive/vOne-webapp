
export interface UserState {
    username: string;
    profile_picture: string;
    status: 'online' | 'offline' | 'away';
    last_online: number;
}