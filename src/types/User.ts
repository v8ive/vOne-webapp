
export interface dbUser {
    id: string;
    username: string;
    bio: string;
    avatar_url: string;
    created_at: string;
}

export type Status = 'online' | 'offline' | 'away';