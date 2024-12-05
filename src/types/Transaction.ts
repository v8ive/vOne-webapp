

export interface Transaction {
    id: number;
    sender_wallet: number;
    recipient_wallet: number;
    amount: number;
    currency_code: string;
    block_id: string;
    fee: number;
    status: string;
    timestamp: Date;
    }