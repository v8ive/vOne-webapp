import { supabase } from '../utils/supabase';

export class Role {
    constructor(
        public id: string,
        public name: string | null,
        public created_at: number | null,
        public users: string[] | null,
    ) {}

    public async fetch() {
        const { data, error } = await supabase.from('roles').select('*').eq('id', this.id).single();
        if (error) {
            console.error('Error fetching role:', error);
            return null;
        } else {
            this.id = data?.id ?? this.id;
            this.name = data?.name ?? this.name;
            this.created_at = data?.created_at ?? this.created_at;
            this.users = data?.users ?? this.users;
        }
        return this;
    }
}