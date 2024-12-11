import { ThemeMode, ThemeName } from '../types/Theme';
import { supabase } from '../utils/supabase';

export class User {
    constructor(
        public id: string,
        public username: string= '',
        public bio: string = '',
        public avatar_url: string = '',
        public created_at: string = '',
        public theme_name: ThemeName = 'iris',
        public theme_mode: ThemeMode = 'dark'
    ) {}

    public async fetch() {
        const { data, error } = await supabase.from('users').select('*').eq('id', this.id).single();
        if (error) {
            console.error('Error fetching user:', error);
            return null;
        } else {
            this.id = data?.id ?? this.id;
            this.username = data?.username ?? this.username;
            this.bio = data?.bio ?? this.bio;
            this.avatar_url = data?.avatar_url ?? this.avatar_url;
            this.created_at = data?.created_at ?? this.created_at;

            const { data: themeData, error: themeError } = await supabase.from('theme').select().eq('user_id', this.id).single();
            if (themeError) {
                console.error('Error fetching user theme:', themeError);
                return null;
            } else {
                this.theme_name = themeData?.theme_name ?? 'iris';
                this.theme_mode = themeData?.theme_mode ?? 'dark';
            }

        }
        return this;
    }

}