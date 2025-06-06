"use client";

import { useSearchParams } from "next/navigation";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
} from "@livekit/components-react";
import "@livekit/components-styles";

export default function WatchStreamPage() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room") || "demo-room";

  const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTE2NTIyNDgsImlzcyI6IkFQSUpzV21kMnVTamhqayIsIm5hbWUiOiJ2aWV3ZXIxMjMiLCJuYmYiOjE3NDkwNjAyNDgsInN1YiI6InZpZXdlcjEyMyIsInZpZGVvIjp7ImNhblN1YnNjcmliZSI6dHJ1ZSwicm9vbSI6ImRlbW8tcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.ewW9LVJCl74T4YvV9fM2Z1FBPUKxTWOQ_YpIIzfIxMU";

  return (
      <LiveKitRoom
          token={token}
          serverUrl="wss://echoverse-zvtumd9b.livekit.cloud"
          connect
          video
          audio
          data-lk-theme="default"
          style={{ height: "100vh", backgroundColor: "black" }}
      >
        <div style={{ padding: "10px", color: "white" }}>
          Đang xem livestream phòng: {room}
        </div>
        <GridLayout style={{ height: "calc(100vh - 50px)" }}>
          <ParticipantTile participant="remote" />
        </GridLayout>
        <RoomAudioRenderer />
      </LiveKitRoom>
  );
}
