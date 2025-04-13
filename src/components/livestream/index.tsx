"use client"

import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const Index: React.FC = () => {
    const [localStream, setLocalStream] = useState<any>(null);
    const [remoteStreams, setRemoteStreams] = useState<any[]>([]);
    const [channel, setChannel] = useState<string | undefined>(undefined);

    const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
    const token = process.env.NEXT_PUBLIC_AGORA_TOKEN!;

    useEffect(() => {
        const startLivestream = async () => {
            try {
                // Capture the game screen (or any other content)
                const gameStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

                // Capture the webcam video
                const webcamStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = webcamStream; // Ensure this is the webcam stream
                }

                // Create the local stream combining both webcam and game screen
                const localStream = AgoraRTC.createStream({
                    streamID: client.uid,
                    audio: true,
                    video: true,
                    screen: false, // Set to true if you want to stream the screen as well
                });

                // Initialize and play the stream
                await localStream.init();
                localStream.play("local-video");
                setLocalStream(localStream);

                await client.publish(localStream);
            } catch (err) {
                console.error("Error during Agora initialization", err);
            }
        };

        startLivestream();
    }, [channel]);


    return (
        <div className="p-4 flex flex-col items-center relative">
            <h2 className="text-2xl font-semibold mb-4">Livestream</h2>

            {/* Main game screen */}
            <div id="local-video" className="w-full h-96 bg-gray-500 mb-4"></div>

            {/* Webcam feed */}
            <div
                id="webcam-video"
                className="absolute bottom-10 right-10 w-32 h-32 bg-black border-4 border-white rounded-full overflow-hidden"
            >
                <video id="webcam-video-element" autoPlay muted className="w-full h-full object-cover"></video>
            </div>

            {/* Remote video */}
            <div id="remote-video" className="w-full h-96 bg-gray-500"></div>
        </div>
    );
};

export default Index;
