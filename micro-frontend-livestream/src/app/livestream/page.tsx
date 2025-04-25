"use client"

import React, { useState, useRef, useEffect } from "react";
import { Eye } from "lucide-react";

const LiveStream = ({ onClose }: { onClose: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
    const [isMicOn, setIsMicOn] = useState<boolean>(true);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [viewers, setViewers] = useState<number>(0);
    const [duration, setDuration] = useState<string>("00:00");
    let mediaRecorder: MediaRecorder | null = null;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isStreaming) {
            interval = setInterval(() => {
                if (startTime) {
                    const currentDuration = Math.floor((Date.now() - startTime) / 1000); // Duration in seconds
                    const hours = Math.floor(currentDuration / 3600);
                    const minutes = Math.floor((currentDuration % 3600) / 60);
                    const seconds = currentDuration % 60;
                    setDuration(`${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
                }
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isStreaming, startTime]);

    const startStreaming = async () => {
        if (isStreaming) return;

        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(userStream);
            if (videoRef.current) {
                videoRef.current.srcObject = userStream;
            }

            // Request screen sharing
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setScreenStream(screenStream);

            // Combine both streams (camera and screen)
            const combinedStream = new MediaStream();
            userStream.getTracks().forEach(track => combinedStream.addTrack(track));
            screenStream.getTracks().forEach(track => combinedStream.addTrack(track));

            // Update the video display with the combined stream
            if (videoRef.current) {
                videoRef.current.srcObject = combinedStream;
            }

            const options = { mimeType: "video/x-matroska;codecs=avc1,opus" };
            mediaRecorder = new MediaRecorder(combinedStream, options);
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };
            mediaRecorder.start();

            setStartTime(Date.now());
            setIsStreaming(true);
        } catch (error) {
            console.error("Error accessing media devices:", error);
            alert("Could not access camera, microphone, or screen. Please allow permission and try again.");
        }
    };

    const stopStreaming = () => {
        if (!isStreaming) return;

        stream?.getTracks().forEach((track) => track.stop());
        screenStream?.getTracks().forEach((track) => track.stop());
        setStream(null);
        setScreenStream(null);
        mediaRecorder?.stop();
        setIsStreaming(false);
    };

    const toggleCamera = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsCameraOn(videoTrack.enabled);
            }
        }
    };

    const toggleMic = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMicOn(audioTrack.enabled);
            }
        }
    };

    const toggleScreenShare = async () => {
        if (screenStream) {
            // Stop screen sharing
            screenStream.getTracks().forEach((track) => track.stop());
            setScreenStream(null);
        } else {
            // Start screen sharing
            const newScreenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setScreenStream(newScreenStream);

            // Combine both streams (camera and screen)
            const combinedStream = new MediaStream();
            if (stream) {
                stream.getTracks().forEach(track => combinedStream.addTrack(track));
            }
            newScreenStream.getTracks().forEach(track => combinedStream.addTrack(track));

            // Update the video display with the combined stream
            if (videoRef.current) {
                videoRef.current.srcObject = combinedStream;
            }
        }
    };

    const saveVideo = () => {
        if (recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);

            const storedVideos = JSON.parse(localStorage.getItem("storedVideos") || "[]");
            storedVideos.push(url);
            localStorage.setItem("storedVideos", JSON.stringify(storedVideos));

            setRecordedChunks([]);
            onClose();
        }
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments((prev) => [...prev, newComment.trim()]);
            setNewComment("");
        }
    };

    const handleCommentKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommentSubmit();
        }
    };

    useEffect(() => {
        if (isStreaming) {
            startStreaming();
        } else {
            stopStreaming();
        }

        return () => {
            stopStreaming();
        };
    }, [isStreaming]);

    return (
        <div className="flex flex-col items-center justify-center p-4 pt-20 z-50 w-full h-full relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
                <div className="col-span-2 w-full h-full relative">
                    <video
                        ref={videoRef}
                        autoPlay
                        className="w-full h-full object-cover rounded-md"
                    ></video>

                    <div className="absolute top-4 right-4 bg-black text-white p-2 rounded-md">
                        <span>{duration}</span>
                    </div>

                    <div className="absolute top-4 left-4 flex items-center bg-black text-white p-2 rounded-md">
                        <Eye size={24} />
                        <span className="ml-2">{viewers} viewers</span>
                    </div>
                </div>

                <div className="w-full h-full bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-white text-lg mb-4">Live Comments</h3>
                    <div className="h-96 overflow-y-scroll mb-4">
                        {comments.map((comment, index) => (
                            <div key={index} className="text-white text-sm mb-2">
                                <strong>User {index + 1}: </strong>{comment}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={handleCommentKeyPress}
                            className="w-full p-2 rounded-full bg-gray-700 text-white focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-5 flex gap-4 w-full justify-center">
                {!isStreaming ? (
                    <button
                        onClick={startStreaming}
                        className="bg-green-500 text-white px-6 py-3 rounded-full text-lg mr-100"
                    >
                        Start Live
                    </button>
                ) : (
                    <>
                        <button
                            onClick={stopStreaming}
                            className="bg-red-500 text-white px-6 py-3 rounded-full text-lg mr-100"
                        >
                            End
                        </button>
                        <button
                            onClick={toggleCamera}
                            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg"
                        >
                            {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
                        </button>
                        <button
                            onClick={toggleMic}
                            className="bg-yellow-500 text-white px-6 py-3 rounded-full text-lg"
                        >
                            {isMicOn ? "Mute Mic" : "Unmute Mic"}
                        </button>
                        <button
                            onClick={toggleScreenShare}
                            className="bg-purple-500 text-white px-6 py-3 rounded-full text-lg"
                        >
                            {screenStream ? "Stop Screen Share" : "Start Screen Share"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LiveStream;
