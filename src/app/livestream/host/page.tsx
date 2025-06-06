"use client";

import { useEffect, useState } from "react";
import { fetchCategoriesWithRooms, createLiveRoom, Category } from "@/services/livestream-api";
import { fetchUserProfile } from "@/services/profile-api";
import HostStreamPage from "./page.client";

export default function LivestreamHostPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [roomName, setRoomName] = useState("");
    const [maxParticipants, setMaxParticipants] = useState(10);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [streamerId, setStreamerId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const [goLive, setGoLive] = useState(false);
    const [token, setToken] = useState("");
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetchCategoriesWithRooms()
            .then(setCategories)
            .catch(console.error);

        fetchUserProfile()
            .then(profile => {
                setStreamerId(profile.streamer?.id || null);
            })
            .catch(console.error);
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const profile = await fetchUserProfile();
            const allowedRoles = ["MODERATOR", "BROADCASTER"];
            const validRoles = profile.roles.filter((r: any) => allowedRoles.includes(r.name));

            if (validRoles.length === 0) {
                alert("You do not have permission to create a room.");
                setLoading(false);
                return;
            }

            const payload = {
                roomName,
                maxParticipants,
                identity: profile.id,
                streamerId: profile.streamer.id,
                roles: validRoles.map((r: any) => ({ name: r.name })),
                categoryId: categoryId!,
                thumbnail: thumbnail!,
            };

            const res = await createLiveRoom(payload);

            localStorage.setItem("livekit_token", res.token);
            localStorage.setItem("livekit_roomName", res.roomData.roomName);

            setToken(res.token);
            setRoom(res.roomData.roomName);
            setUsername(profile.username);
            setGoLive(true);
        } catch (err) {
            console.error("❌ Error creating room:", err);
            alert("Failed to create room");
        } finally {
            setLoading(false);
        }
    };

    if (goLive && token && room && username) {
        return <HostStreamPage username={username} room={room} />;
    }

    return (
        <div className="max-w-xl mx-auto p-4 space-y-4 text-white">
            <h1 className="text-2xl font-bold">Setup Livestream</h1>
            <div className="p-2 border border-white rounded">
                <label className="block text-sm">Streamer ID:</label>
                <div>{streamerId ?? "Loading..."}</div>
            </div>
            <input
                type="text"
                placeholder="Room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full p-2 bg-black border border-white rounded"
            />
            <input
                type="number"
                placeholder="Max participants"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                className="w-full p-2 bg-black border border-white rounded"
            />
            <select
                className="w-full p-2 bg-black border border-white rounded"
                value={categoryId ?? ""}
                onChange={(e) => setCategoryId(Number(e.target.value))}
            >
                <option value="" disabled>Select category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
                className="w-full p-2 text-white"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-600 px-4 py-2 rounded text-white"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Room & Go Live"}
            </button>
        </div>
    );
}
