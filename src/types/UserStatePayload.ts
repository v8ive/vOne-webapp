import { UserState } from "./UserState";

export interface UserStatePayload {
    user_id: string;
    user_state: UserState;
    is_guest: boolean;
}