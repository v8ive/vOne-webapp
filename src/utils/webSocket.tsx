import { Block } from "../types/Block";
import { Miner, MinerStatusUpdate } from "../types/Miner";


interface WebSocketMessage {
    data: string;
}

interface WebSocketHandlers {
    onMessage: (action: string, data: Miner | Block | MinerStatusUpdate) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

const connectToWebSocket = (
    url: string,
    onMessage: WebSocketHandlers['onMessage'],
    onOpen?: WebSocketHandlers['onOpen'],
    onClose?: WebSocketHandlers['onClose']
): WebSocket => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
        if (onOpen) {
            onOpen();
        }

        // console.log('WebSocket connection established.');
    };

    ws.onmessage = (message: WebSocketMessage) => {
        const messageJson = JSON.parse(message.data);
        if (messageJson.action === 'new_block') {
            onMessage(messageJson.action, messageJson.data as Block);
        }
        if (messageJson.action === 'new_miner') {
            onMessage(messageJson.action, messageJson.data as Miner);
        }
        if (messageJson.action === 'miner_status_update') {
            onMessage(messageJson.action, messageJson.data as MinerStatusUpdate);
        }
    };

    ws.onclose = () => {
        if (onClose) {
            onClose();
        }

        // console.warn('WebSocket connection closed. Wont attempt to reconnect.');
    };

    return ws;
};

interface SendMessage {
    (ws: WebSocket, message: string): void;
}

const sendMessage: SendMessage = (ws, message) => {
    if (ws instanceof WebSocket) { // Check if ws is a WebSocket instance
        ws.send(message);
    } else {
        console.error('Invalid WebSocket object for sending message');
    }
};

export { connectToWebSocket, sendMessage };