
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (username && roomName) {
      const encodedRoom = encodeURIComponent(roomName);
      router.push(`/livestream/host?username=${username}&room=${encodedRoom}`);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="p-8 rounded-xl bg-gray-900 w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold">Set Up Livestream</h2>

          <input
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />

          <input
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
          />

          <button
              onClick={handleJoin}
              className="w-full bg-green-600 hover:bg-green-700 rounded p-2 font-semibold"
          >
            Join Room
          </button>
        </div>
      </div>
  );
}
