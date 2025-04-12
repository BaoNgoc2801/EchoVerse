'use client';

import React, { useState, useEffect } from "react";
import LayoutWithHeader from "@/components/layout/layout-with-header";

const StoredVideoPage = () => {
    const [storedVideos, setStoredVideos] = useState<string[]>([]);

    useEffect(() => {
        // Lấy video đã lưu từ localStorage
        const videos = JSON.parse(localStorage.getItem("storedVideos") || "[]");
        setStoredVideos(videos);
        console.log("Loaded Stored Videos:", videos); // Log để kiểm tra
    }, []);

    return (
        <LayoutWithHeader>
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-4">Các Video Đã Lưu</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {storedVideos.length > 0 ? (
                        storedVideos.map((videoUrl, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="text-white text-lg">Video {index + 1}</h3>
                                <video
                                    controls
                                    src={videoUrl}  // Sử dụng Blob URL lấy từ localStorage
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Chưa có video nào được lưu.</p>
                    )}
                </div>
            </div>
        </LayoutWithHeader>
    );
};

export default StoredVideoPage;
