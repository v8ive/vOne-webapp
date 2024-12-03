
export interface Wallet {
    id: string;
    user_id: string;
    currency_code: string;
    balances: Balances[];
    created_at: string;
    updated_at: string;
}

interface Balances {
    balance: number;
    currency_code: string;
}