import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;

export function connectWebSocket(
    senderId: number,
    onMessageReceived: (msg: any) => void
): void {
    const socket = new SockJS(`http://localhost:8081/profile/ws?senderId=${senderId}`);
    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: (str: string) => {
            console.log(str);
        },
        onConnect: () => {
            console.log('WebSocket connected');
            const topic = `/topic/conversation.${senderId}`;
            stompClient?.subscribe(topic, (message: IMessage) => {
                onMessageReceived(JSON.parse(message.body));
            });
        },
    });

    stompClient.activate();
}

export function sendMessage(destination: string, payload: any): void {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination,
            body: JSON.stringify(payload),
        });
    }
}

export function disconnectWebSocket(): void {
    if (stompClient) {
        stompClient.deactivate();
    }
}
