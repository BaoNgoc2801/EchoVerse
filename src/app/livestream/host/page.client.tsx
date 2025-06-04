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

interface Props {
    username: string;
    room: string;
}

function StreamControls() {
    const { localParticipant } = useLocalParticipant();
    const [isStreaming, setIsStreaming] = useState(false);
    const [permissionError, setPermissionError] = useState<string>("");
    const [hasPermissions, setHasPermissions] = useState(false);

    const requestPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            stream.getTracks().forEach(track => track.stop());

            setHasPermissions(true);
            setPermissionError("");
            return true;
        } catch (error: any) {
            console.error("Permission error:", error);
            setHasPermissions(false);

            if (error.name === 'NotAllowedError') {
                setPermissionError("Please allow camera and microphone access in your browser");
            } else if (error.name === 'NotFoundError') {
                setPermissionError("Camera or microphone not found");
            } else {
                setPermissionError("Device access error: " + error.message);
            }
            return false;
        }
    };

    const toggleCamera = async () => {
        if (!hasPermissions) {
            const granted = await requestPermissions();
            if (!granted) return;
        }

        try {
            if (localParticipant) {
                await localParticipant.setCameraEnabled(!localParticipant.isCameraEnabled);
                setPermissionError("");
            }
        } catch (error: any) {
            console.error("Camera toggle error:", error);
            setPermissionError("Không thể bật/tắt camera: " + error.message);
        }
    };

    const toggleMicrophone = async () => {
        if (!hasPermissions) {
            const granted = await requestPermissions();
            if (!granted) return;
        }

        try {
            if (localParticipant) {
                await localParticipant.setMicrophoneEnabled(!localParticipant.isMicrophoneEnabled);
                setPermissionError("");
            }
        } catch (error: any) {
            console.error("Microphone toggle error:", error);
            setPermissionError("Cannot toggle micro: " + error.message);
        }
    };

    const startStreaming = async () => {
        const granted = await requestPermissions();
        if (!granted) return;

        try {
            if (localParticipant) {
                await localParticipant.setCameraEnabled(true);
                await localParticipant.setMicrophoneEnabled(true);
                setIsStreaming(true);
                setPermissionError("");
            }
        } catch (error: any) {
            console.error("Start streaming error:", error);
            setPermissionError("Cannot start livestream: " + error.message);
        }
    };

    const stopStreaming = async () => {
        try {
            if (localParticipant) {
                await localParticipant.setCameraEnabled(false);
                await localParticipant.setMicrophoneEnabled(false);
                setIsStreaming(false);
                setPermissionError("");
            }
        } catch (error: any) {
            console.error("Stop streaming error:", error);
            setPermissionError("Stop streaming error: " + error.message);
        }
    };

    return (
        <div className="stream-controls" style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(0,0,0,0.7)',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '250px'
        }}>
            <div style={{ color: 'white', fontWeight: 'bold' }}>
                Host Controls
            </div>

            {permissionError && (
                <div style={{
                    color: '#ff6b6b',
                    fontSize: '12px',
                    background: 'rgba(255,107,107,0.1)',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,107,107,0.3)'
                }}>
                    {permissionError}
                </div>
            )}

            {!hasPermissions && (
                <button
                    onClick={requestPermissions}
                    style={{
                        background: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '12px'
                    }}
                >
                    🔓 Permission camera/microphone
                </button>
            )}

            {!isStreaming ? (
                <button
                    onClick={startStreaming}
                    disabled={!hasPermissions}
                    style={{
                        background: hasPermissions ? '#22c55e' : '#6b7280',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        cursor: hasPermissions ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold',
                        opacity: hasPermissions ? 1 : 0.6
                    }}
                >
                    🔴 Start Live Stream
                </button>
            ) : (
                <button
                    onClick={stopStreaming}
                    style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    ⏹️ Stop Stream
                </button>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    onClick={toggleCamera}
                    disabled={!hasPermissions}
                    style={{
                        background: localParticipant?.isCameraEnabled ? '#3b82f6' : '#6b7280',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '5px',
                        cursor: hasPermissions ? 'pointer' : 'not-allowed',
                        opacity: hasPermissions ? 1 : 0.6,
                        fontSize: '12px'
                    }}
                >
                    📹 Camera
                </button>

                <button
                    onClick={toggleMicrophone}
                    disabled={!hasPermissions}
                    style={{
                        background: localParticipant?.isMicrophoneEnabled ? '#3b82f6' : '#6b7280',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '5px',
                        cursor: hasPermissions ? 'pointer' : 'not-allowed',
                        opacity: hasPermissions ? 1 : 0.6,
                        fontSize: '12px'
                    }}
                >
                    🎤 Mic
                </button>
            </div>

            <div style={{ fontSize: '12px', color: '#ccc' }}>
                Status: {isStreaming ? '🔴 LIVE' : '⚫ Offline'}
            </div>

            {hasPermissions && (
                <div style={{ fontSize: '10px', color: '#22c55e' }}>
                    ✅ Đã có quyền truy cập
                </div>
            )}
        </div>
    );
}

export default function HostStreamPage({ username, room }: Props) {
    const [token, setToken] = useState<string>("");
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const generateToken = async () => {
            try {

                const hostToken = await createHostToken(username, room);
                setToken(hostToken);
            } catch (error) {
                console.error("Error generating token:", error);
                setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTE2MzA0MDIsImlzcyI6IkFQSUpzV21kMnVTamhqayIsIm5hbWUiOiJob3N0IiwibmJmIjoxNzQ5MDM4NDAyLCJzdWIiOiJob3N0IiwidmlkZW8iOnsiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoiZGVtby1yb29tIiwicm9vbUpvaW4iOnRydWV9fQ.eUxtZqz-z9Vufv2vo3FZpMwHZf5srmR0N8MARGhKrZc");
            }
        };

        generateToken();
    }, [username, room]);

    const createHostToken = async (username: string, room: string) => {

        const payload = {
            exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
            iss: "APIJsWmd2uSjhjk",
            name: username,
            nbf: Math.floor(Date.now() / 1000),
            sub: username,
            video: {
                canPublish: true,
                canSubscribe: true,
                room: room,
                roomJoin: true
            }
        };

        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTE2MzA0MDIsImlzcyI6IkFQSUpzV21kMnVTamhqayIsIm5hbWUiOiJob3N0IiwibmJmIjoxNzQ5MDM4NDAyLCJzdWIiOiJob3N0IiwidmlkZW8iOnsiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoiZGVtby1yb29tIiwicm9vbUpvaW4iOnRydWV9fQ.eUxtZqz-z9Vufv2vo3FZpMwHZf5srmR0N8MARGhKrZc";
    };

    const handleRoomConnected = () => {
        setIsConnected(true);
        console.log("Connected to room:", room);
    };

    const handleRoomDisconnected = () => {
        setIsConnected(false);
        console.log("Disconnected from room");
    };

    if (!token) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#000',
                color: 'white'
            }}>
                <div>Đang chuẩn bị livestream... 🔄</div>
            </div>
        );
    }

    return (
        <div style={{ height: '100vh', background: '#000' }}>
            <LiveKitRoom
                token={token}
                serverUrl="wss://echoverse-zvtumd9b.livekit.cloud"
                connect={true}
                video={false}
                audio={false}
                data-lk-theme="default"
                onConnected={handleRoomConnected}
                onDisconnected={handleRoomDisconnected}
                style={{ height: '100%' }}
            >
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 10,
                    background: 'rgba(0,0,0,0.7)',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    color: 'white'
                }}>
                    <div style={{ fontWeight: 'bold' }}>Room: {room}</div>
                    <div style={{ fontSize: '14px' }}>Host: {username}</div>
                    <div style={{ fontSize: '12px', color: isConnected ? '#22c55e' : '#ef4444' }}>
                        {isConnected ? '🟢 Connected' : '🔴 Connecting...'}
                    </div>
                </div>

                <StreamControls />

                <VideoConference
                    chatMessageFormatter={(message, participant) =>
                        `${participant?.name || 'Anonymous'}: ${message.message}`
                    }
                />

                <RoomAudioRenderer />

                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    zIndex: 10
                }}>
                    <DisconnectButton style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        🚪 Leave Room
                    </DisconnectButton>
                </div>
            </LiveKitRoom>
        </div>
    );
}