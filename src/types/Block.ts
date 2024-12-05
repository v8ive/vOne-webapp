import { Transaction } from "./Transaction";

export interface Block {
    id: number;
    block_height: number;
    miner_id: string;
    timestamp: string;
    transactions: Transaction[];
    difficulty: number;
    nonce: number;
    hash: string;
    previous_hash: string;
}