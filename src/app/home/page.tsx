"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [role, setRole] = useState("host");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !room) return;
        if (role === "host") {
            router.push(`/livestream/host?page=client&username=${name}&room=${room}`);
        } else {
            router.push(`/livestream/watch/${room}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-6 rounded-lg w-full max-w-sm text-white space-y-4"
            >
                <h2 className="text-xl font-semibold">Set Up Livestream</h2>
                <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    placeholder="Room name"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    required
                />

                <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="host"
                            checked={role === "host"}
                            onChange={() => setRole("host")}
                        />
                        Host
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="viewer"
                            checked={role === "viewer"}
                            onChange={() => setRole("viewer")}
                        />
                        Viewer
                    </label>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Join Room
                </Button>
            </form>
        </div>
    );
}