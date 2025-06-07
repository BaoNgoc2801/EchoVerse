"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useParticipants,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";

import "@livekit/components-styles";
import { getTokenForUser } from "@/services/livestream-api";

interface WatchPageImplProps {
  roomName: string;
  serverUrl: string;
}

function RoomContent({ roomName }: { roomName: string }) {
  const participantsMap = useParticipants();
  const participants = participantsMap
      ? Array.from(participantsMap.values())
      : [];

  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: false },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);

  useEffect(() => {
    console.log("👥 Participants:", participants);
    console.log("🎥 Tracks:", tracks);
  }, [participants, tracks]);

  return (
      <>
        <div style={{ padding: "10px", color: "white" }}>
          Livetream at: <strong>{roomName}</strong> <br />
          👥 Participants: {participants.length} <br />
          🎥 Track video: {tracks.length}
        </div>

        {tracks.length > 0 ? (
            <GridLayout tracks={tracks} style={{ height: "calc(100vh - 100px)" }}>
              {tracks.map((trackRef) =>
                  trackRef.publication ? (
                      <ParticipantTile
                          key={trackRef.publication.trackSid}
                          trackRef={trackRef}
                      />
                  ) : null
              )}
            </GridLayout>
        ) : (
            <div className="flex h-[calc(100vh-100px)] items-center justify-center text-white">
              No video here
            </div>
        )}

        <RoomAudioRenderer />
      </>
  );
}

export default function WatchPageImpl({
                                        roomName,
                                        serverUrl,
                                      }: WatchPageImplProps) {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true);
        console.log("🔐 Fetching token for room:", roomName);
        const userToken = await getTokenForUser(roomName);
        console.log("✅ Token fetched:", userToken);
        setToken(userToken);
      } catch (err: any) {
        const errorMessage = "❌ Failed to fetch token: " + err.message;
        console.error(errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [roomName]);

  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center text-white bg-black">
          Loading...
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex h-screen items-center justify-center text-red-500 bg-black">
          Error: {error}
        </div>
    );
  }

  if (!token) {
    return (
        <div className="flex h-screen items-center justify-center text-white bg-black">
          Cannot connect to livestream. Please try again!
        </div>
    );
  }

  return (
      <LiveKitRoom
          token={token}
          serverUrl={serverUrl}
          connect={true}
          video={false}
          audio={false}
          onConnected={() => console.log("✅ Connected to LiveKit Room")}
          onDisconnected={(reason) => console.log("❌ Disconnected:", reason)}
          onError={(err) => console.error("🚨 LiveKitRoom error:", err)}
      >
        <RoomContent roomName={roomName} />
      </LiveKitRoom>
  );
}



