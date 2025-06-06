"use client";

import { useState, useEffect } from "react";
import {
    LiveKitRoom,
    VideoConference,
    useLocalParticipant,
    DisconnectButton,
    RoomAudioRenderer
} from "@livekit/components-react";
import "@livekit/components-styles";

function StreamControls() {
    const { localParticipant } = useLocalParticipant();
    const [isStreaming, setIsStreaming] = useState(false);
    const [permissionError, setPermissionError] = useState<string>("");
    const [hasPermissions, setHasPermissions] = useState(false);

    const requestPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            stream.getTracks().forEach(track => track.stop());
            setHasPermissions(true);
            setPermissionError("");
            return true;
        } catch (error: any) {
            setHasPermissions(false);
            if (error.name === "NotAllowedError") {
                setPermissionError("Please allow camera and microphone access.");
            } else {
                setPermissionError("Device access error: " + error.message);
            }
            return false;
        }
    };

    const toggleCamera = async () => {
        if (!hasPermissions && !(await requestPermissions())) return;
        await localParticipant?.setCameraEnabled(!localParticipant.isCameraEnabled);
    };

    const toggleMicrophone = async () => {
        if (!hasPermissions && !(await requestPermissions())) return;
        await localParticipant?.setMicrophoneEnabled(!localParticipant.isMicrophoneEnabled);
    };

    const startStreaming = async () => {
        if (!await requestPermissions()) return;
        await localParticipant?.setCameraEnabled(true);
        await localParticipant?.setMicrophoneEnabled(true);
        setIsStreaming(true);
    };

    const stopStreaming = async () => {
        await localParticipant?.setCameraEnabled(false);
        await localParticipant?.setMicrophoneEnabled(false);
        setIsStreaming(false);
    };

    return (
        <div style={{
            position: 'absolute', top: 20, right: 20, zIndex: 10,
            background: 'rgba(0,0,0,0.7)', padding: '15px', borderRadius: '8px',
            color: 'white', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '250px'
        }}>
            <strong>🎛 Host Controls</strong>

            {permissionError && (
                <div style={{
                    color: '#ff6b6b', background: 'rgba(255,107,107,0.1)', padding: '8px',
                    borderRadius: '4px', fontSize: '12px'
                }}>{permissionError}</div>
            )}

            {!hasPermissions && (
                <button onClick={requestPermissions} className="bg-yellow-500 text-white font-bold px-3 py-2 rounded text-sm">
                    🔓 Enable camera/mic
                </button>
            )}

            {!isStreaming ? (
                <button onClick={startStreaming} disabled={!hasPermissions}
                        className={`text-white font-bold px-3 py-2 rounded text-sm ${hasPermissions ? 'bg-green-500' : 'bg-gray-500 cursor-not-allowed'}`}>
                    🔴 Start Live Stream
                </button>
            ) : (
                <button onClick={stopStreaming}
                        className="bg-red-500 text-white font-bold px-3 py-2 rounded text-sm">
                    ⏹️ Stop Stream
                </button>
            )}

            <div className="flex gap-2">
                <button onClick={toggleCamera} disabled={!hasPermissions}
                        className={`px-2 py-1 rounded text-sm ${localParticipant?.isCameraEnabled ? 'bg-blue-500' : 'bg-gray-600'} text-white`}>
                    📹 Camera
                </button>
                <button onClick={toggleMicrophone} disabled={!hasPermissions}
                        className={`px-2 py-1 rounded text-sm ${localParticipant?.isMicrophoneEnabled ? 'bg-blue-500' : 'bg-gray-600'} text-white`}>
                    🎤 Mic
                </button>
            </div>

            <div className="text-xs text-gray-300">Status: {isStreaming ? '🔴 LIVE' : '⚫ Offline'}</div>
            {hasPermissions && <div className="text-xs text-green-400">✅ Permissions granted</div>}
        </div>
    );
}

export default function HostStreamPage() {
    const [token, setToken] = useState<string | null>(null);
    const [roomName, setRoomName] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("livekit_token");
        const storedRoom = localStorage.getItem("livekit_roomName");
        if (storedToken && storedRoom) {
            setToken(storedToken);
            setRoomName(storedRoom);
        } else {
            alert("❌ Token or RoomName missing. Please create a room first.");
        }
    }, []);

    if (!token || !roomName) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white">
                <span>🔄 Preparing your livestream...</span>
            </div>
        );
    }

    return (
        <div className="h-screen bg-black">
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                connect
                video={false}
                audio={false}
                data-lk-theme="default"
                onConnected={() => setIsConnected(true)}
                onDisconnected={() => setIsConnected(false)}
                style={{ height: '100%' }}
            >
                <div style={{
                    position: 'absolute', top: 20, left: 20, zIndex: 10,
                    background: 'rgba(0,0,0,0.7)', padding: '10px 15px',
                    borderRadius: '8px', color: 'white'
                }}>
                    <div><strong>Room:</strong> {roomName}</div>
                    <div className="text-sm">
                        Status: {isConnected ? '🟢 Connected' : '🔴 Connecting...'}
                    </div>
                </div>

                <StreamControls />

                <VideoConference
                    chatMessageFormatter={(message, participant) =>
                        `${participant?.name || 'Anonymous'}: ${message.message}`
                    }
                />

                <RoomAudioRenderer />

                <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 10 }}>
                    <DisconnectButton className="bg-red-500 text-white px-4 py-2 rounded">
                        🚪 Leave Room
                    </DisconnectButton>
                </div>
            </LiveKitRoom>
        </div>
    );
}
