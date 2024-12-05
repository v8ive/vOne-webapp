import { useEffect, useRef, useState } from 'react';
import { Block } from '../../types/Block';
import { Miner, MinerStatusUpdate } from '../../types/Miner';
import { Switch, Table } from "@radix-ui/themes";
import { connectToWebSocket, sendMessage } from '../../utils/webSocket';
import useAuthStore, { supabase } from '../../store/Auth';
import './style.css';

function MiningPage() {
    const [isConnected, setIsConnected] = useState(false);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [miners, setMiners] = useState<Miner[]>([]);
    
    const { user } = useAuthStore();
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!user) {
            return;
        }
        
        const fetchMiners = async (): Promise<Miner[]> => {
            const miners = await supabase
                .from('miners')
                .select('*')
                .eq('user_id', user.user_id)
                .then(({ data, error }) => {
                    if (error) {
                        console.log('Error fetching miners:', error);
                        return [];
                    }
                    return data;
                });
            setMiners(miners);
            return miners;
        }
        fetchMiners();

        const fetchBlocks = async () => {
            const blocks = await supabase
                .from('blocks')
                .select('*')
                .then(({ data, error }) => {
                    if (error) {
                        console.log('Error fetching blocks:', error);
                        return [];
                    }
                    return data;
                });
            setBlocks(blocks);
        }
        fetchBlocks();

        if (!wsRef.current) {
            const ws = connectToWebSocket(
                import.meta.env.VITE_WEBSOCKET_URL + '?user_id=' + user?.user_id,
                async (action, data) => { // onMessage
                    if (action === 'new_block') {
                        setBlocks(blocks => [...blocks, data as Block]);
                    }
                    if (action === 'new_miner') {
                        setMiners(miners => [...miners, data as Miner]);
                    }
                    if (action === 'miner_status_update') {
                        console.log(`Miner ${(data as MinerStatusUpdate).miner.id} status update...`);
                        let fetchedMiners = miners;
                        if (miners.length === 0) {
                            // console.error('Miners not loaded yet');
                            fetchedMiners = await fetchMiners();
                        }
                        const updatedMiners = (miners.length > 0 ? miners : fetchedMiners).map((miner) => {
                            if (miner.id === (data as MinerStatusUpdate).miner.id) {
                                console.log('Updating miner:', miner.id, (data as MinerStatusUpdate).message);
                                return (data as MinerStatusUpdate).miner;
                            }
                            return miner;
                        });
                        setMiners(updatedMiners);
                    }
                },
                () => { // onOpen
                    setIsConnected(true);
                    console.log('WebSocket connection established.');
                },
                () => { // onClose
                    wsRef.current = null;
                    setIsConnected(false);
                    console.warn('WebSocket connection closed. Wont attempt to reconnect.');
                }
            );
            (ws as WebSocket & { user_id?: string }).user_id = user?.user_id;
            wsRef.current = ws;
        }

        return () => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.close();
            }
        };
    }, [user]);

    if (!user) {
        return <p>Please sign in.</p>;
    }

    const handleAddMiner = () => {
        if (!wsRef.current) {
            console.error('WebSocket connection not established');
            return;
        };
        const messageJson = JSON.stringify({ action: 'add_miner', user_id: user?.user_id, currencyCode: 'Lux' });
        sendMessage(wsRef.current, messageJson);
    };

    const toggleMinerMining = async (ctxMiner: Miner) => {
        const updatedMiners = miners.map((miner) => {
            if (miner.id === ctxMiner.id) {
                return {
                    ...miner,
                    mining: !miner.mining,
                    status: miner.mining ? 'stopping' : 'starting',
                };
            }
            return miner;
        });
        setMiners(updatedMiners);

        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection not established');
            return;
        }

        const messageJson = JSON.stringify({
            action: ctxMiner.mining ? 'miner_stop' : 'miner_start',
            miner_id: ctxMiner.id,
            user_id: user?.user_id,
        });
        sendMessage(wsRef.current, messageJson);
    }

    const toggleMinerPower = async (ctxMiner: Miner) => {
        const updatedMiners = miners.map((miner) => {
            if (miner.id === ctxMiner.id) {
                return {
                    ...miner,
                    active: !miner.active,
                    status: miner.active ? 'powering_off' : 'powering_on',
                };
            }
            return miner;
        });
        setMiners(updatedMiners);

        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection not established');
            return;
        }

        const messageJson = JSON.stringify({
            action: ctxMiner.active ? 'miner_power_off' : 'miner_power_on',
            miner_id: ctxMiner.id,
            user_id: user?.user_id,
        });
        sendMessage(wsRef.current, messageJson);
    };

    return (
        <div className='container'>
            <h1>Blockchain</h1>
            {!isConnected && <p>Connecting...</p>}
            {isConnected &&
                <div>
                    <div>
                        {blocks.length > 0 && (
                            <>
                                <h2>Blocks</h2>
                                <Table.Root variant='surface'>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColumnHeaderCell>Height</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Hash</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Nonce</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Previous Hash</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Timestamp</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Transactions</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Miner</Table.ColumnHeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {blocks.map((block: Block, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell>{block.block_height}</Table.Cell>
                                                <Table.Cell>{block.hash.slice(0, 5) + (block.hash.slice(0, 5).length > 4 ? '...' : '')}</Table.Cell>
                                                <Table.Cell>{block.nonce}</Table.Cell>
                                                <Table.Cell>{block.previous_hash.slice(0, 5) + (block.previous_hash.slice(0, 5).length > 4 ? '...' : '')}</Table.Cell>
                                                <Table.Cell>{block.timestamp}</Table.Cell>
                                                <Table.Cell>{block.transactions.length}</Table.Cell>
                                                <Table.Cell>{block.miner_id}</Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Root>
                            </>
                        )}
                    </div>
                    <div>
                        {miners.length > 0 && (
                            <>
                                <h2>Miners</h2>
                                <Table.Root variant='surface'>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColumnHeaderCell>Miner ID</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Hash Rate</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Balance</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Mining</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Power</Table.ColumnHeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {miners.map((miner: Miner, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell>{miner.id}</Table.Cell>
                                                <Table.Cell>{miner.hash_rate}</Table.Cell>
                                                <Table.Cell>{miner.balance} {miner.currency_code}</Table.Cell>
                                                <Table.Cell>{miner.status}</Table.Cell>
                                                <Table.Cell>
                                                    <Switch
                                                        color={miner.mining ? 'green' : 'red'}
                                                        checked={miner.mining}
                                                        onCheckedChange={() => toggleMinerMining(miner)}
                                                        disabled={miner.status === 'starting' || miner.status === 'stopping'}
                                                    />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Switch
                                                        color={miner.active ? 'green' : 'red'}
                                                        checked={miner.active}
                                                        onCheckedChange={() => toggleMinerPower(miner)}
                                                        disabled={miner.status === 'powering_on' || miner.status === 'powering_off'}
                                                    />
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Root>
                            </>
                            
                        )}
                    </div>
                    <div>
                        <button onClick={handleAddMiner}>Add Miner</button>
                    </div>
                </div>
            }
            
        </div>
    );
}

export default MiningPage;