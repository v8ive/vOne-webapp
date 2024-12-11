import { User } from '../classes/User';
import { supabase } from '../utils/supabase';

export async function createUser(username: string, avatar_url: string): Promise<User | null> {
    const { data, error } = await supabase.from('users').insert([{ username, avatar_url }]).select().single();
    if (error) {
        console.error('Error creating user:', error)
        return null;
    };
    return data as User;
}