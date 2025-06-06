'use client';

import { useEffect, useRef, useState } from 'react';
import {
    Room,
    createLocalAudioTrack,
    createLocalVideoTrack,
    RoomConnectOptions,
} from 'livekit-client';

export default function LivestreamBroadcastPage() {
    const [room, setRoom] = useState<Room | null>(null);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCamOn, setIsCamOn] = useState(true);

    const videoTrackRef = useRef<any>(null);
    const audioTrackRef = useRef<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("livekit_token");
        const roomName = localStorage.getItem("livekit_roomName");

        if (!token || !roomName) {
            alert("Thiếu token hoặc roomName. Vui lòng tạo lại phòng.");
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

                const videoElement = document.getElementById("live-video") as HTMLVideoElement;
                if (videoElement) videoTrack.attach(videoElement);

                videoTrackRef.current = videoTrack;
                audioTrackRef.current = audioTrack;
                setRoom(newRoom);
                console.log("✅ Host connected & streaming");
            } catch (error) {
                console.error("❌ Failed to connect host to room:", error);
            }
        };

        connect();

        return () => {
            newRoom.disconnect();
        };
    }, []);

    const toggleMic = () => {
        if (audioTrackRef.current) {
            const enabled = !isMicOn;
            audioTrackRef.current.setEnabled(enabled);
            setIsMicOn(enabled);
        }
    };

    const toggleCam = () => {
        if (videoTrackRef.current) {
            const enabled = !isCamOn;
            videoTrackRef.current.setEnabled(enabled);
            setIsCamOn(enabled);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-2xl mb-4">🎥 You are Live!</h1>
            <video id="live-video" autoPlay muted className="rounded-lg w-[720px] h-[480px] mb-4" />
            <div className="flex gap-4">
                <button onClick={toggleMic} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
                    {isMicOn ? "🔇 Tắt Mic" : "🎤 Bật Mic"}
                </button>
                <button onClick={toggleCam} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
                    {isCamOn ? "📷 Tắt Cam" : "🎥 Bật Cam"}
                </button>
            </div>
        </div>
    );
}
