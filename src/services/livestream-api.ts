// src/services/livestream-api.ts
import axios from "axios";

const BACKEND_URL: string = process.env.NEXT_PUBLIC_GET_CATEGORY_API ?? "";
const CREATE_ROOM_URL: string = process.env.NEXT_PUBLIC_CREATE_ROOM_API ?? "";

if (!BACKEND_URL) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_GET_CATEGORY_API");
}

if (!CREATE_ROOM_URL) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_CREATE_ROOM_API");
}

export interface Room {
    id: number;
    roomName: string;
    status: string;
    maxParticipants: number;
    thumbnail: string | null;
    createdAt: string;
    updatedAt: string;
    streamerId: number;
    categoryId: number;
}

export interface Category {
    id: number;
    name: string;
    rooms: Room[];
}

export interface CreateRoomPayload {
    roomName: string;
    maxParticipants: number;
    identity: number;
    roles: { name: string }[];
    streamerId: number;
    categoryId: number;
    thumbnail?: File | string; // Accept file or URL string
}

export async function fetchCategoriesWithRooms(): Promise<Category[]> {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("No token found");
    console.log("🔐 Token:", token);

    try {
        const response = await axios.get<Category[]>(BACKEND_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("📦 Categories response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Failed to fetch categories with rooms:", error);
        throw new Error("Failed to fetch categories with rooms");
    }
}

export async function createLiveRoom(payload: CreateRoomPayload): Promise<Room> {
    console.log("📤 Creating room with payload:", payload);

    try {
        const formData = new FormData();
        formData.append("roomName", payload.roomName);
        formData.append("maxParticipants", String(payload.maxParticipants));
        formData.append("identity", String(payload.identity));
        formData.append("streamerId", String(payload.streamerId));
        formData.append("categoryId", String(payload.categoryId));

        const roleName = payload.roles.find(r => r.name === "MODERATOR" || r.name === "BROADCASTER")?.name;
        if (!roleName) throw new Error("Missing valid role");

        formData.append("roles", roleName);

        if (payload.thumbnail instanceof File) {
            formData.append("thumbnail", payload.thumbnail);
        } else if (typeof payload.thumbnail === "string") {
            formData.append("thumbnail", payload.thumbnail);
        }

        const response = await axios.post(CREATE_ROOM_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("✅ Room created successfully:", response.data);
        return response.data.roomData;
    } catch (error) {
        console.error("❌ Failed to create live room:", error);
        throw new Error("Failed to create live room");
    }
}
