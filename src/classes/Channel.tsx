import { Permission } from '../types/Permission';
import { supabase } from '../utils/supabase';

export class Channel {
    constructor(
        public id: string,
        public name: string | undefined = undefined,
        public description: string | undefined = undefined,
        public created_at: string | undefined = undefined,
        public owner_id: string | undefined = undefined,
        public is_private: boolean | undefined = undefined,
        public roles: Record<string, Permission[]> | undefined = undefined
    ) {}
    
    public async fetch() {
        const { data, error } = await supabase.from('channels').select('*').eq('id', this.id).single();
        if (error) {
            console.error('Error fetching channel:', error);
            return null;
        } else {
            this.id = data?.id ?? this.id;
            this.name = data?.name ?? this.name;
            this.description = data?.description ?? this.description;
            this.created_at = data?.created_at ?? this.created_at;
            this.owner_id = data?.owner_id ?? this.owner_id;
            this.is_private = data?.is_private ?? this.is_private;
            this.roles = data?.roles ?? this.roles;
        }
        return this;
    }

    public async update() {
        const { error } = await supabase.from('channels').update({
            name: this.name,
            description: this.description,
            is_private: this.is_private,
            roles: this.roles
        }).eq('id', this.id);
        if (error) {
            console.error('Error updating channel:', error);
            return false;
        } else {
            return true;
        }
    }
}