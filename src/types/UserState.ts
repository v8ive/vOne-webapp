import { Status } from "./User";

export interface UserState {
    username: string;
    profile_picture: string;
    status: Status;
    last_online: number;
}