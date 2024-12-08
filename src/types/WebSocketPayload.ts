import { UserStatePayload } from "./UserStatePayload";
import { WebSocketError } from "./WebSocketError";

export interface WebSocketPayload {
    action: string;
    data: UserStatePayload | WebSocketError | Record<string, UserStatePayload>;
}