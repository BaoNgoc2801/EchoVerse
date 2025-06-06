"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Room,
    RoomEvent,
    RemoteParticipant,

    LocalVideoTrack,
    LocalAudioTrack
} from "livekit-client";

interface RoomData {
    id: number;
    roomName: string;
    status: string;
    maxParticipants: number;
    thumbnail: string;
    streamerId: number;
    categoryId: number;
}

interface LivestreamResponse {
    roomData: RoomData;
    livekitRoom: string;
    token: string;
}

export default function LivestreamHostLivePage() {
    const params = useParams();
    const router = useRouter();
    const roomName = params.roomName as string;

    const [room, setRoom] = useState<Room | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [participants, setParticipants] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const [roomData, setRoomData] = useState<RoomData | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack | null>(null);
    const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack | null>(null);

    useEffect(() => {
        // Get room data from localStorage or API call
        const storedRoomData = localStorage.getItem(`room_${roomName}`);
        if (storedRoomData) {
            const data: LivestreamResponse = JSON.parse(storedRoomData);
            setRoomData(data.roomData);
            connectToRoom(data.token);
        } else {
            // If no stored data, redirect back to setup
            router.push('/livestream/host');
        }

        return () => {
            if (room) {
                room.disconnect();
            }
        };
    }, [roomName]);

    const connectToRoom = async (token: string) => {
        try {
            const newRoom = new Room();

            // Set up event listeners
            newRoom.on(RoomEvent.Connected, () => {
                console.log("Connected to room");
                setIsConnected(true);
                setParticipants(newRoom.remoteParticipants.size + 1);
            });

            newRoom.on(RoomEvent.Disconnected, () => {
                console.log("Disconnected from room");
                setIsConnected(false);
                setIsStreaming(false);
            });

            newRoom.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
                console.log("Participant connected:", participant.identity);
                setParticipants(newRoom.remoteParticipants.size + 1);
            });

            newRoom.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
                console.log("Participant disconnected:", participant.identity);
                setParticipants(newRoom.remoteParticipants.size + 1);
            });

            // Connect to room
            const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://your-livekit-server.com';
            await newRoom.connect(wsUrl, token);

            setRoom(newRoom);
        } catch (err) {
            console.error("Failed to connect to room:", err);
            setError("Failed to connect to livestream room");
        }
    };

    const startStreaming = async () => {
        if (!room) return;

        try {
            setError("");

            // Enable camera and microphone
            await room.localParticipant.enableCameraAndMicrophone();

            // Get local video track and attach to video element
            const videoTrack = room.localParticipant.videoTrackPublications.values().next().value?.track as LocalVideoTrack;
            const audioTrack = room.localParticipant.audioTrackPublications.values().next().value?.track as LocalAudioTrack;

            if (videoTrack && videoRef.current) {
                videoTrack.attach(videoRef.current);
                setLocalVideoTrack(videoTrack);
            }

            if (audioTrack) {
                setLocalAudioTrack(audioTrack);
            }

            setIsStreaming(true);
        } catch (err) {
            console.error("Failed to start streaming:", err);
            setError("Failed to start streaming. Please check camera/microphone permissions.");
        }
    };

    const stopStreaming = async () => {
        if (!room) return;

        try {
            // Disable camera and microphone
            await room.localParticipant.setCameraEnabled(false);
            await room.localParticipant.setMicrophoneEnabled(false);

            // Detach video track
            if (localVideoTrack && videoRef.current) {
                localVideoTrack.detach(videoRef.current);
            }

            setIsStreaming(false);
            setLocalVideoTrack(null);
            setLocalAudioTrack(null);
        } catch (err) {
            console.error("Failed to stop streaming:", err);
            setError("Failed to stop streaming");
        }
    };

    const endLivestream = async () => {
        if (room) {
            await room.disconnect();
        }

        // Clean up stored room data
        localStorage.removeItem(`room_${roomName}`);

        // Redirect to host page
        router.push('/livestream/host');
    };

    const toggleMicrophone = async () => {
        if (!room) return;

        const enabled = room.localParticipant.isMicrophoneEnabled;
        await room.localParticipant.setMicrophoneEnabled(!enabled);
    };

    const toggleCamera = async () => {
        if (!room) return;

        const enabled = room.localParticipant.isCameraEnabled;
        await room.localParticipant.setCameraEnabled(!enabled);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-gray-900 p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold">{roomData?.roomName || roomName}</h1>
                    <div className="text-sm text-gray-400">
                        {isConnected ? (
                            <span className="text-green-400">● LIVE - {participants} viewers</span>
                        ) : (
                            <span className="text-red-400">● Connecting...</span>
                        )}
                    </div>
                </div>

                <button
                    onClick={endLivestream}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                    End Stream
                </button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row h-full">
                {/* Video Area */}
                <div className="flex-1 p-4">
                    <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video relative">
                        {isStreaming ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">📹</div>
                                    <p className="text-xl mb-4">Ready to go live?</p>
                                    {error && (
                                        <p className="text-red-400 mb-4">{error}</p>
                                    )}
                                    <button
                                        onClick={startStreaming}
                                        disabled={!isConnected}
                                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-3 rounded-lg text-lg font-semibold"
                                    >
                                        {isConnected ? "Start Streaming" : "Connecting..."}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Live indicator */}
                        {isStreaming && (
                            <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded text-sm font-bold">
                                ● LIVE
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    {isStreaming && (
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                onClick={toggleMicrophone}
                                className={`p-3 rounded-full ${
                                    room?.localParticipant.isMicrophoneEnabled
                                        ? 'bg-gray-700 hover:bg-gray-600'
                                        : 'bg-red-600 hover:bg-red-700'
                                }`}
                            >
                                {room?.localParticipant.isMicrophoneEnabled ? '🎤' : '🔇'}
                            </button>

                            <button
                                onClick={toggleCamera}
                                className={`p-3 rounded-full ${
                                    room?.localParticipant.isCameraEnabled
                                        ? 'bg-gray-700 hover:bg-gray-600'
                                        : 'bg-red-600 hover:bg-red-700'
                                }`}
                            >
                                {room?.localParticipant.isCameraEnabled ? '📹' : '📵'}
                            </button>

                            <button
                                onClick={stopStreaming}
                                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full"
                            >
                                Stop Stream
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar - Chat and Stats */}
                <div className="lg:w-80 bg-gray-900 p-4">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Stream Stats</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Status:</span>
                                <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Viewers:</span>
                                <span>{participants}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Max Viewers:</span>
                                <span>{roomData?.maxParticipants}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Stream Info</h3>
                        <div className="text-sm space-y-1">
                            <p><strong>Room:</strong> {roomData?.roomName}</p>
                            <p><strong>Category ID:</strong> {roomData?.categoryId}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}