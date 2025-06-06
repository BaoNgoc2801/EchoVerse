'use client';

import { useEffect, useRef, useState } from 'react';
import {
    Room,
    createLocalAudioTrack,
    createLocalVideoTrack,
    LocalTrackPublication,
    RoomConnectOptions,
} from 'livekit-client';

export default function HostLivePage() {
    const [room, setRoom] = useState<Room | null>(null);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCamOn, setIsCamOn] = useState(true);
    const videoTrackRef = useRef<any>(null);
    const audioTrackRef = useRef<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("livekit_token");
        const roomName = localStorage.getItem("livekit_roomName");

        if (!token || !roomName) {
            console.error("Missing token or room name");
            return;
        }

        const newRoom = new Room();

        const connect = async () => {
            try {
                const videoTrack = await createLocalVideoTrack();
                const audioTrack = await createLocalAudioTrack();

                const options: RoomConnectOptions = {
                    audio: false,
                    video: false,
                };

                await newRoom.connect("wss://your-livekit-server.com", token, options);
                await newRoom.localParticipant.publishTrack(videoTrack);
                await newRoom.localParticipant.publishTrack(audioTrack);

                // Lưu vào ref để điều khiển bật/tắt
                videoTrackRef.current = videoTrack;
                audioTrackRef.current = audioTrack;

                const videoElement = document.getElementById('live-video') as HTMLVideoElement;
                if (videoElement) videoTrack.attach(videoElement);

                setRoom(newRoom);
                console.log("✅ Connected to room");
            } catch (err) {
                console.error("❌ Failed to connect:", err);
            }
        };

        connect();

        return () => {
            newRoom.disconnect();
        };
    }, []);

    // Toggle Microphone
    const handleToggleMic = () => {
        if (audioTrackRef.current) {
            const enabled = !isMicOn;
            audioTrackRef.current.setEnabled(enabled);
            setIsMicOn(enabled);
        }
    };

    // Toggle Camera
    const handleToggleCam = () => {
        if (videoTrackRef.current) {
            const enabled = !isCamOn;
            videoTrackRef.current.setEnabled(enabled);
            setIsCamOn(enabled);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-2xl mb-4">🎥 You are now Live</h1>
            <video id="live-video" autoPlay muted className="rounded-lg w-[720px] h-[480px] mb-4" />
            <div className="flex gap-4">
                <button
                    onClick={handleToggleMic}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
                >
                    {isMicOn ? '🔇 Tắt mic' : '🎤 Bật mic'}
                </button>
                <button
                    onClick={handleToggleCam}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
                >
                    {isCamOn ? '📷 Tắt cam' : '🎥 Bật cam'}
                </button>
            </div>
        </div>
    );
}
