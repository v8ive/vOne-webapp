

export interface Miner {
    id: number;
    user_id: string;
    hash_rate: number;
    currency_code: string;
    balance: number;
    active: boolean;
    mining: boolean;
    status: string;
}

export interface MinerStatusUpdate {
    miner: Miner
    message: string;
}