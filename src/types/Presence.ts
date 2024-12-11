import { Status } from "./User";

export interface Presence {
    name?: string;
    presence_ref?: string;
    user_id?: string;
    username: string;
    status: Status;
    last_online: number;
    avatar_url: string;
}