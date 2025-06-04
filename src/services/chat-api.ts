import axios from "axios";

const CONVERSATIONS_API = process.env.NEXT_PUBLIC_CONVERSATIONS_API;
const MESSAGES_API = process.env.NEXT_PUBLIC_MESSAGES_API;
const CONTACT_API = process.env.NEXT_PUBLIC_CONTACT_API;

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

export type Contact = {
    userId: number;
    chanelName: string;
    avatar: string | null;
};


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

export async function fetchContacts(): Promise<Contact[]> {
    try {
        if (!CONTACT_API) throw new Error("CONTACT_API is not defined");
        const token = localStorage.getItem("auth_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(CONTACT_API, { headers });
        console.log("📇 Contacts:", res.data);
        return res.data.result;
    } catch (error) {
        console.error("❌ Error fetching contacts:", error);
        return [];
    }
}

export async function getContactNameById(userId: number): Promise<string> {
    try {
        const contacts = await fetchContacts();
        const contact = contacts.find((c) => c.userId === userId);
        return contact?.chanelName || `User ${userId}`;
    } catch {
        return `User ${userId}`;
    }
}

