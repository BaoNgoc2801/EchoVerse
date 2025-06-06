// Chat.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    connectWebSocket,
    sendMessage,
    disconnectWebSocket,
} from "@/services/webSocketClient";
import {
    fetchMessages,
    fetchConversations,
} from "@/services/chat-api";
import { fetchUserProfile } from "@/services/profile-api";

interface ChatMessage {
    senderId: number;
    receiverId: number;
    content: string;
    messageType: string;
    timestamp?: number;
}

const Chat: React.FC = () => {
    const [senderId, setSenderId] = useState<number | null>(null);
    const [receiverId, setReceiverId] = useState<number | null>(null);
    const [conversationId, setConversationId] = useState<number | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const init = async () => {
            try {
                console.log("🚀 Initializing chat...");

                const profile = await fetchUserProfile();
                console.log("👤 User profile:", profile);

                // Đảm bảo profile.id là số hợp lệ
                const senderIdNum = parseInt(String(profile.id), 10);
                if (isNaN(senderIdNum)) {
                    console.error("❌ Invalid sender ID from profile:", profile.id);
                    return;
                }

                setSenderId(senderIdNum);
                console.log("🔍 senderId set to:", senderIdNum);

                const conversations = await fetchConversations(senderIdNum);
                console.log("💬 Conversations:", conversations);

                if (!conversations || conversations.length === 0) {
                    console.warn("⚠️ No conversations found");
                    return;
                }

                const firstConvo = conversations[0];
                console.log("📋 First conversation:", firstConvo);

                const otherId = firstConvo.userOneId === senderIdNum ? firstConvo.userTwoId : firstConvo.userOneId;

                // Đảm bảo otherId là số hợp lệ
                const receiverIdNum = parseInt(String(otherId), 10);
                if (isNaN(receiverIdNum)) {
                    console.error("❌ Invalid receiver ID:", otherId);
                    return;
                }

                setReceiverId(receiverIdNum);
                setConversationId(firstConvo.conversationId);

                console.log("🔍 receiverId set to:", receiverIdNum);
                console.log("🔍 conversationId set to:", firstConvo.conversationId);

                const msgs = await fetchMessages(firstConvo.conversationId);
                console.log("📨 Fetched messages:", msgs);

                const formattedMessages = msgs.map((m: any) => ({
                    senderId: parseInt(String(m.senderId), 10),
                    receiverId: parseInt(String(m.receiverId), 10),
                    content: m.message,
                    messageType: m.messageType,
                })).reverse();

                setMessages(formattedMessages);
                console.log("📝 Formatted messages:", formattedMessages);

                // Kết nối WebSocket với logging chi tiết
                console.log("🔌 Connecting WebSocket with:", {
                    sender: senderIdNum,
                    receiver: receiverIdNum,
                    senderType: typeof senderIdNum,
                    receiverType: typeof receiverIdNum
                });

                // Đảm bảo thứ tự tham số đúng: sender, receiver, callback
                connectWebSocket(senderIdNum, receiverIdNum, (msg: ChatMessage) => {
                    console.log("📥 WebSocket callback - Received new message:", msg);
                    setMessages((prev) => {
                        const isDuplicate = prev.some(existingMsg =>
                            existingMsg.senderId === msg.senderId &&
                            existingMsg.content === msg.content &&
                            Math.abs(Date.now() - (existingMsg.timestamp || 0)) < 1000
                        );
                        if (isDuplicate) {
                            console.log("⚠️ Duplicate message detected, skipping");
                            return prev;
                        }
                        const newMessages = [...prev, { ...msg, timestamp: Date.now() }];
                        console.log("✅ Added new message, total messages:", newMessages.length);
                        return newMessages;
                    });
                });

            } catch (error) {
                console.error("❌ Error initializing chat:", error);
            }
        };

        init();

        return () => {
            console.log("🧹 Cleaning up chat component...");
            disconnectWebSocket();
        };
    }, []);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTo({
                top: messageListRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    const handleSend = () => {
        if (!inputMessage.trim() || senderId === null || receiverId === null) {
            console.warn("⚠️ Cannot send message:", { inputMessage: inputMessage.trim(), senderId, receiverId });
            return;
        }

        const msg: ChatMessage = {
            senderId,
            receiverId,
            content: inputMessage,
            messageType: "TEXT",
        };

        console.log("📤 Preparing to send message:", msg);

        // Gửi tin nhắn qua WebSocket
        sendMessage("/app/chat.sendMessage", msg);

        setInputMessage("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Debug info */}
            <div className="p-2 bg-gray-800 text-xs text-gray-400">
                Sender: {senderId} | Receiver: {receiverId} | Conversation: {conversationId} | Messages: {messages.length}
            </div>

            <div className="flex-1 p-4">
                <div
                    ref={messageListRef}
                    className="h-full overflow-y-auto space-y-2"
                >
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`p-3 rounded max-w-xs ${
                                m.senderId === senderId
                                    ? 'bg-blue-600 ml-auto text-right'
                                    : 'bg-gray-700 mr-auto'
                            }`}
                        >
                            <div className="text-xs opacity-70 mb-1">
                                From: {m.senderId} To: {m.receiverId}
                            </div>
                            {m.content}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-gray-800 flex gap-2">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button
                    onClick={handleSend}
                    disabled={!inputMessage.trim()}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-medium"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;