import { Block } from "./Block";
import { Miner } from "./Miner";


export interface WebSocketData {
    blockchain: Block[] | [];
    miners: Miner[] | [];
}