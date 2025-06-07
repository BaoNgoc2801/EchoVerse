// src/services/livestream-api.ts
import axios from "axios";
import { Room } from "livekit-client";
import { fetchUserProfile } from "./profile-api";
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

export interface CreateRoomResponse {
    token: string;
    livekitRoom: string;
    roomData: Room;
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

export async function createLiveRoom(payload: CreateRoomPayload): Promise<CreateRoomResponse> {
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

        return {
            token: response.data.token,
            livekitRoom: response.data.livekitRoom,
            roomData: response.data.roomData,
        };
    } catch (error) {
        console.error("❌ Failed to create live room:", error);
        throw new Error("Failed to create live room");
    }
}



export async function getLivestreamRooms() {
    try {
        if (!process.env.NEXT_PUBLIC_LIVESTREAM_API_URL) {
            throw new Error("NEXT_PUBLIC_LIVESTREAM_API_URL is not defined in .env");
        }

        console.log(
            "Fetching livestream rooms from:",
            process.env.NEXT_PUBLIC_LIVESTREAM_API_URL
        );
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_LIVESTREAM_API_URL}/room`
        );
        console.log("Livestream rooms fetched:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching livestream rooms:", {
            errorMessage: error.message,
            errorResponse: error.response?.data,
        });
        throw new Error("Failed to fetch livestream rooms");
    }
}

export async function getTokenForUser(roomName: string) {
    try {
        if (!process.env.NEXT_PUBLIC_LIVESTREAM_API_URL) {
            throw new Error("NEXT_PUBLIC_LIVESTREAM_API_URL is not defined in .env");
        }

        console.log("Fetching token for room:", {
            roomName,
            LIVESTREAM_API_URL: process.env.NEXT_PUBLIC_LIVESTREAM_API_URL,
        });
        const token = localStorage.getItem("auth_token");
        console.log("Auth token from localStorage:", token ? "Found" : "Not found");
        if (!token) {
            throw new Error("No auth token found in localStorage");
        }

        const userProfile = await fetchUserProfile();
        console.log("User profile fetched:", { userId: userProfile.id });
        const userId = userProfile.id;

        console.log("Sending request to generate token:", {
            roomName,
            identity: `user_${userId}`,
        });
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_LIVESTREAM_API_URL}/livekit/generate-token`,
            {
                roomName,
                identity: `user_${userId}`,
                roles: [{ name: "USER" }],
            }
        );

        console.log("Token response:", { token: response.data.token });
        return response.data.token;
    } catch (error: any) {
        console.error("Error fetching token:", {
            roomName,
            errorMessage: error.message,
            errorResponse: error.response?.data,
        });
        throw new Error(`Failed to fetch token for viewer: ${error.message}`);
    }
}

export async function joinRoom(roomName: string) {
    try {
        if (!process.env.NEXT_PUBLIC_LIVEKIT_WS_URL) {
            throw new Error("NEXT_PUBLIC_LIVEKIT_WS_URL is not defined in .env");
        }

        console.log("Starting to join room:", {
            roomName,
            LIVEKIT_WS_URL: process.env.NEXT_PUBLIC_LIVEKIT_WS_URL,
        });
        const token = await getTokenForUser(roomName);
        console.log("Generated Token:", token);

        const room = new Room();
        console.log("Attempting to connect to LiveKit server...");
        await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_WS_URL, token, {
            autoSubscribe: true,
        });
        console.log("Successfully connected to room:", roomName);

        return room;
    } catch (error: any) {
        console.error("Error joining room:", {
            roomName,
            errorMessage: error.message,
            errorResponse: error.response?.data,
            stack: error.stack,
        });
        throw new Error(`Failed to join livestream room: ${error.message}`);
    }
}


