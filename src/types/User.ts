import { User as supaUser } from "@supabase/supabase-js";
import { Wallet } from "./Wallet";

export interface User extends supaUser {
    username: string;
    email: string;
    profile_picture: string;
    discord_id: string;
    user_id: string;
    wallets: Wallet[];
}