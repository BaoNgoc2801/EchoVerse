"use client"

import React, { useState, useRef, useEffect } from "react";

const LiveStream = ({ onClose }: { onClose: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [videos, setVideos] = useState<string[]>([]);
    let mediaRecorder: MediaRecorder | null = null;

    const startStreaming = async () => {
        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(userStream);
            if (videoRef.current) {
                videoRef.current.srcObject = userStream;
            }
            mediaRecorder = new MediaRecorder(userStream);
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };
            mediaRecorder.start();
        } catch (error) {
            console.error("Error accessing media devices.", error);
        }
    };

    const stopStreaming = () => {
        stream?.getTracks().forEach((track) => track.stop());
        setStream(null);
        mediaRecorder?.stop();
    };

    const saveVideo = () => {
        if (recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            setVideos((prev) => [...prev, url]);
            setRecordedChunks([]);
            onClose();
        }
    };

    useEffect(() => {
        startStreaming();
        return () => stopStreaming();
    }, []);

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
            <video ref={videoRef} autoPlay className="w-full h-full object-cover"></video>

            <div className="absolute bottom-5 flex gap-4">
                <button onClick={stopStreaming} className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg">
                    End
                </button>
                <button onClick={saveVideo} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">
                    Save
                </button>
            </div>
        </div>
    );
};

export default LiveStream;
