// src/app/home/page.tsx
import React from 'react';
import Link from 'next/link';

const Home = () => {
    const liveVideos = [
        { id: 1, title: 'Live Stream 1', description: 'Description for stream 1' },
        { id: 2, title: 'Live Stream 2', description: 'Description for stream 2' },
        // Add more streams as needed
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Live Streams</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {liveVideos.map((video) => (
                    <div key={video.id} className="bg-gray-800 text-white p-4 rounded-lg">
                        <Link href={`/livestream/${video.id}`}>
                            <h2 className="text-xl font-semibold">{video.title}</h2>
                            <p>{video.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
