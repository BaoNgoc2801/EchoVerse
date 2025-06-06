// webSocketClient.ts
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;
let currentTopic: string | null = null;
let isConnected = false;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

export function connectWebSocket(
    sender: number,
    receiver: number,
    onMessageReceived: (msg: any) => void
): void {
    console.log("🔍 connectWebSocket called with:", {
        sender,
        receiver,
        onMessageReceivedType: typeof onMessageReceived,
        senderType: typeof sender,
        receiverType: typeof receiver
    });

    if (
        typeof sender !== "number" || typeof receiver !== "number" ||
        typeof onMessageReceived !== "function" ||
        isNaN(sender) || isNaN(receiver) ||
        sender <= 0 || receiver <= 0
    ) {
        console.error("❌ Invalid parameters:", {
            sender,
            receiver,
            senderType: typeof sender,
            receiverType: typeof receiver,
            callbackType: typeof onMessageReceived
        });
        return;
    }

    // Ngắt kết nối cũ nếu có
    if (stompClient && stompClient.connected) {
        console.log("🔄 Disconnecting existing connection...");
        disconnectWebSocket();
    }

    console.log("🧪 connectWebSocket args:", { sender, receiver });
    console.log("🔍 sender type:", typeof sender, "value:", sender);
    console.log("🔍 receiver type:", typeof receiver, "value:", receiver);

    const socket = new SockJS(`http://localhost:8081/profile/ws?senderId=${sender}`);

    // Đảm bảo sender và receiver là số nguyên hợp lệ
    const senderNum = parseInt(String(sender), 10);
    const receiverNum = parseInt(String(receiver), 10);

    // Kiểm tra lại sau khi parse
    if (isNaN(senderNum) || isNaN(receiverNum)) {
        console.error("❌ Failed to parse sender or receiver to valid numbers:", { sender, receiver, senderNum, receiverNum });
        return;
    }

    const newTopic = `/topic/conversation.${Math.min(senderNum, receiverNum)}_${Math.max(senderNum, receiverNum)}`;
    console.log("✅ Subscribing to topic:", newTopic);
    currentTopic = newTopic;

    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str: string) => {
            console.log("📡 STOMP Debug:", str);
            if (str.includes('ERROR') || str.includes('DISCONNECT')) {
                console.error("❌ WebSocket Error:", str);
            }
        },
        onConnect: (frame) => {
            console.log("✅ Connected to WebSocket");
            console.log("📡 Topic to subscribe:", newTopic);
            isConnected = true;
            reconnectAttempts = 0;

            try {
                const subscription = stompClient?.subscribe(newTopic, (message: IMessage) => {
                    try {
                        const body = JSON.parse(message.body);
                        console.log("📥 Received message:", body);
                        onMessageReceived(body);
                    } catch (error) {
                        console.error("❌ Error parsing message:", error, message.body);
                    }
                });

                if (subscription) {
                    console.log("✅ Successfully subscribed to", newTopic);
                    console.log("📋 Subscription ID:", subscription.id);
                } else {
                    console.error("❌ Failed to create subscription");
                }
            } catch (error) {
                console.error("❌ Error subscribing:", error);
            }
        },
        onDisconnect: (frame) => {
            console.log("❌ Disconnected from WebSocket:", frame);
            isConnected = false;
        },
        onStompError: (frame) => {
            console.error("❌ STOMP Error:", frame);
            isConnected = false;

            // Thử kết nối lại
            if (reconnectAttempts < maxReconnectAttempts) {
                reconnectAttempts++;
                console.log(`🔄 Attempting to reconnect... (${reconnectAttempts}/${maxReconnectAttempts})`);
                setTimeout(() => {
                    connectWebSocket(sender, receiver, onMessageReceived);
                }, 2000 * reconnectAttempts);
            }
        },
        onWebSocketError: (error) => {
            console.error("❌ WebSocket connection error:", error);
            isConnected = false;
        }
    });

    try {
        console.log("🚀 Activating STOMP client...");
        stompClient.activate();
    } catch (error) {
        console.error("❌ Error activating STOMP client:", error);
    }
}

export function sendMessage(destination: string, payload: any): void {
    if (!stompClient) {
        console.error("❌ STOMP client not initialized");
        return;
    }

    if (!stompClient.connected || !isConnected) {
        console.warn("❌ WebSocket not connected. Message not sent:", payload);
        return;
    }

    try {
        console.log("📤 Sending message to:", destination);
        console.log("📤 Message payload:", payload);
        stompClient.publish({
            destination,
            body: JSON.stringify(payload),
        });
        console.log("✅ Message sent successfully");
    } catch (error) {
        console.error("❌ Error sending message:", error);
    }
}

export function disconnectWebSocket(): void {
    if (stompClient) {
        try {
            console.log("🔌 Disconnecting WebSocket...");
            stompClient.deactivate();
        } catch (error) {
            console.error("❌ Error disconnecting:", error);
        } finally {
            stompClient = null;
            isConnected = false;
            currentTopic = null;
            reconnectAttempts = 0;
            console.log("✅ WebSocket disconnected");
        }
    }
}

// Utility function để kiểm tra trạng thái kết nối
export function isWebSocketConnected(): boolean {
    return stompClient?.connected === true && isConnected;
}