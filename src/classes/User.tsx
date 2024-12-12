import { supabase } from '../utils/supabase';

export class User {
    constructor(
        public id: string,
        public username: string= 'New User',
        public bio: string = 'This is my Bio!',
        public avatar_url: string = '',
        public created_at: number = 0,
    ) {
        this.username = username;
        this.bio = bio;
        this.avatar_url = avatar_url;
    }

    public async fetch() {
        let { data, error } = await supabase.from('users').select('*').eq('id', this.id).single();
        if (error) {
            console.error('Error fetching user:', error);
            return null;
        } else {
            if (data) {
                this.username = data.username;
                this.bio = data.bio;
                this.avatar_url = data.avatar_url;
                this.created_at = data.created_at;
            } else {
                ({ data, error } = await supabase.from('users').insert([{
                    id: this.id,
                    username: this.username,
                    bio: this.bio,
                    avatar_url: this.avatar_url,
                    created_at: new Date().getTime(),
                }]).single());
                if (error) {
                    console.error('Error creating user:', error);
                    return null;
                }
            }

        }
        return this;
    }

}