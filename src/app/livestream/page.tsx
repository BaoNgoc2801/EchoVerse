'use client';

import React, { useState, useRef, useEffect } from "react";
import LayoutWithHeader from "@/components/layout/layout-with-header";
import { Eye } from "lucide-react";  // Importing the Eye icon from lucide-react
import { formatDuration } from "../../utils/formatDuration";  // Assuming you have a utility function to format the stream duration

const LiveStream = ({ onClose }: { onClose: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);  // To track the live stream start time
    const [viewers, setViewers] = useState<number>(0);  // Mock viewer count
    let mediaRecorder: MediaRecorder | null = null;

    // Format the duration (in seconds) to a human-readable format
    const calculateDuration = () => {
        if (startTime) {
            const duration = Math.floor((Date.now() - startTime) / 1000); // Duration in seconds
            return formatDuration(duration);
        }
        return "00:00";
    };

    // Start streaming and begin recording
    const startStreaming = async () => {
        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(userStream);
            if (videoRef.current) {
                videoRef.current.srcObject = userStream;  // Assign the stream to the video element
            }

            // Initialize MediaRecorder to record the video stream
            mediaRecorder = new MediaRecorder(userStream);
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);  // Store video chunks
                }
            };
            mediaRecorder.start();
            setStartTime(Date.now());  // Start the live stream timer
            setIsStreaming(true);  // Set streaming status to true
        } catch (error) {
            // Handle error in stream initialization (e.g., permissions denied)
            console.error("Error accessing media devices.", error);
            alert("Could not access camera or microphone. Please allow permission and try again.");
        }
    };

    // Stop streaming and recording
    const stopStreaming = () => {
        stream?.getTracks().forEach((track) => track.stop());
        setStream(null);
        mediaRecorder?.stop();
        setIsStreaming(false);
    };

    // Save the recorded video
    const saveVideo = () => {
        if (recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            // Store the URL in localStorage or send it to a backend server
            const storedVideos = JSON.parse(localStorage.getItem("storedVideos") || "[]");
            storedVideos.push(url);
            localStorage.setItem("storedVideos", JSON.stringify(storedVideos));
            setRecordedChunks([]);
            onClose();
        } else {
            console.error("No recorded chunks available for saving!");
        }
    };

    // Handle new comment submission
    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments((prev) => [...prev, newComment.trim()]);
            setNewComment(""); // Clear the comment input
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
                            <span>{calculateDuration()}</span> {/* Display the stream duration */}
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
