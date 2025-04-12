'use client';

import React, { useState, useRef, useEffect } from "react";
import LayoutWithHeader from "@/components/layout/layout-with-header";
import { Eye } from "lucide-react";  // Importing the Eye icon from lucide-react

const LiveStream = ({ onClose }: { onClose: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);  // To track the live stream start time
    const [viewers, setViewers] = useState<number>(0);  // Mock viewer count
    const [duration, setDuration] = useState<string>("00:00");  // Store live stream duration
    let mediaRecorder: MediaRecorder | null = null;

    // Update the live stream duration every second
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
                    console.log(`Current Duration: ${duration}`); // Log the current duration
                }
            }, 1000);  // Update every second
        }

        return () => {
            if (interval) {
                clearInterval(interval);  // Clear the interval when the component unmounts or stops streaming
            }
        };
    }, [isStreaming, startTime, duration]);

    // Start streaming and begin recording
    const startStreaming = async () => {
        if (isStreaming) return; // Prevent starting the stream if it's already streaming

        console.log("Starting live stream...");

        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(userStream);
            if (videoRef.current) {
                videoRef.current.srcObject = userStream;  // Assign the stream to the video element
            }

            // Initialize MediaRecorder to record with the Matroska format and codecs avc1 and opus
            const options = { mimeType: "video/x-matroska;codecs=avc1,opus" };
            mediaRecorder = new MediaRecorder(userStream, options);
            mediaRecorder.ondataavailable = (event) => {
                console.log("Recording video chunk..."); // Log when a video chunk is available
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => {
                        const updatedChunks = [...prev, event.data];
                        console.log("Recorded chunks:", updatedChunks); // Log the current recorded chunks
                        return updatedChunks;
                    });
                }
            };
            mediaRecorder.start();
            console.log("MediaRecorder started.");

            setStartTime(Date.now());  // Start the live stream timer
            setIsStreaming(true);  // Set streaming status to true
            console.log("Live stream started at:", startTime);
        } catch (error) {
            console.error("Error accessing media devices:", error);
            alert("Could not access camera or microphone. Please allow permission and try again.");
        }
    };

    // Stop streaming and recording
    const stopStreaming = () => {
        if (!isStreaming) return; // Prevent stopping if not currently streaming

        console.log("Stopping live stream...");

        stream?.getTracks().forEach((track) => track.stop());
        setStream(null);
        mediaRecorder?.stop();
        setIsStreaming(false);
        console.log("Live stream stopped.");
    };

    // Save the recorded video
    const saveVideo = () => {
        if (recordedChunks.length > 0) {
            // Create a Blob from the recorded video chunks
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);

            // Log the URL of the saved video
            console.log("Video saved successfully! Video URL:", url);

            // Optionally, you can store the video URL in localStorage (for persistence)
            const storedVideos = JSON.parse(localStorage.getItem("storedVideos") || "[]");
            storedVideos.push(url);
            localStorage.setItem("storedVideos", JSON.stringify(storedVideos));

            // Log the stored videos in localStorage
            console.log("Stored Videos in LocalStorage:", storedVideos);

            setRecordedChunks([]);
            onClose(); // Close or clean up after saving
        } else {
            console.error("No recorded chunks available for saving!");
        }
    };

    // Handle new comment submission
    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments((prev) => [...prev, newComment.trim()]);
            setNewComment(""); // Clear the comment input
            console.log("New comment added:", newComment);
        }
    };

    useEffect(() => {
        if (isStreaming) {
            startStreaming();
        } else {
            stopStreaming();
        }

        return () => {
            stopStreaming(); // Cleanup when component unmounts
        };
    }, [isStreaming]);

    return (
        <LayoutWithHeader>
            <div className="flex flex-col items-center justify-center p-4 pt-20 z-50 w-full h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
                    {/* Left side: Video Player */}
                    <div className="col-span-2 w-full h-full relative">
                        <video
                            ref={videoRef}
                            autoPlay
                            className="w-full h-full object-cover rounded-md"
                        ></video>

                        {/* Stream Duration Display (Right Corner) */}
                        <div className="absolute top-4 right-4 bg-black text-white p-2 rounded-md">
                            <span>{duration}</span> {/* Display the live stream duration */}
                        </div>

                        {/* Viewers Display (Left Corner) */}
                        <div className="absolute top-4 left-4 flex items-center bg-black text-white p-2 rounded-md">
                            <Eye size={24} />
                            <span className="ml-2">{viewers} viewers</span>
                        </div>
                    </div>

                    {/* Right side: Comments Section */}
                    <div className="w-full h-full bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-white text-lg mb-4">Live Comments</h3>
                        <div className="h-96 overflow-y-scroll mb-4">
                            {comments.map((comment, index) => (
                                <div key={index} className="text-white text-sm mb-2">
                                    <strong>User {index + 1}: </strong>{comment}
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg w-full"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>

                {/* Bottom control buttons */}
                <div className="absolute bottom-5 flex gap-4 w-full justify-center">
                    {!isStreaming ? (
                        <button
                            onClick={startStreaming}
                            className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg"
                        >
                            Start Live
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={stopStreaming}
                                className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg"
                            >
                                End
                            </button>
                            <button
                                onClick={saveVideo}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg"
                            >
                                Save
                            </button>
                        </>
                    )}
                </div>
            </div>
        </LayoutWithHeader>
    );
};

export default LiveStream;
