import { supabase } from "../store/Auth";
import { User } from "../types/User";

export async function createWallet(user: User) {
    const { error } = await supabase
        .from('wallets')
        .insert([{
            user_id: user?.user_id,
            balances: [{
                currency_code: 'Nox',
                balance: 0
            },
            {
                currency_code: 'Lux',
                balance: 0
            }],
        }]);

    if (error) {
        throw error;
    }

    return;
}