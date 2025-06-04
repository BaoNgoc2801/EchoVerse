import axios from "axios";

const CONVERSATIONS_API = process.env.NEXT_PUBLIC_CONVERSATIONS_API;
const MESSAGES_API = process.env.NEXT_PUBLIC_MESSAGES_API;

export type Conversation = {
    conversationId: number;
    userOneId: number;
    userTwoId: number;
    lastMessage: string;
    lastSentAt: string;
};

export type Message = {
    messageId: number;
    senderId: number;
    receiverId: number;
    message: string;
    sentAt: string;
    messageType: string;
    read: boolean;
};

// Lấy danh sách cuộc hội thoại theo userId
export async function fetchConversations(userId: number): Promise<Conversation[]> {
    const token = localStorage.getItem("auth_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
        const res = await axios.get(`${CONVERSATIONS_API}/${userId}`, { headers });
        console.log("✅ Conversations:", res.data);
        return res.data.result;
    } catch (error) {
        console.error("❌ Error fetching conversations:", error);
        return [];
    }
}

// Lấy danh sách tin nhắn theo conversationId
export async function fetchMessages(conversationId: number): Promise<Message[]> {
    const token = localStorage.getItem("auth_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
        const res = await axios.get(`${MESSAGES_API}/${conversationId}`, { headers });
        console.log("✅ Messages:", res.data);
        return res.data.result;
    } catch (error) {
        console.error("❌ Error fetching messages:", error);
        return [];
    }
}
