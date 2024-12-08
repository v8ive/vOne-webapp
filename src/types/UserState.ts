
export interface UserState {
    username: string;
    status: 'online' | 'offline' | 'away';
    last_online: number;
}