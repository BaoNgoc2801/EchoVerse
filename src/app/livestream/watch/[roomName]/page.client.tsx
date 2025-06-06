'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import axios from "axios";

export default function LiveStreamWatchPage({ params }: { params: { roomName: string } }) {
  const { roomName } = params;
  const searchParams = useSearchParams();
  const identity = searchParams.get("identity") || "viewer";
  const role = searchParams.get("role") || "USER";

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    axios
        .post("/api/livekit/token", { roomName, identity, roles: [{ name: role }] })
        .then((res) => setToken(res.data.token))
        .catch((err) => console.error("Token generation failed:", err));
  }, [roomName, identity, role]);

  if (!token) return <div className="text-center p-4">Đang tải...</div>;

  return (
      <LiveKitRoom
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          connect={true}
          data-lk-theme="default"
      >
        <VideoConference />
      </LiveKitRoom>
  );
}
