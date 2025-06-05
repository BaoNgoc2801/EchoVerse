"use client";

import { Plus} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTrendingStreams, StreamItem } from "@/services/dashboard-api";

const Dashboard = () => {
    const [streams, setStreams] = useState<StreamItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStreams = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchTrendingStreams();
                setStreams(data);
            } catch (err) {
                setError("Failed to load trending streams");
                console.error("Error loading streams:", err);
            } finally {
                setLoading(false);
            }
        };

        loadStreams();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden ml-6">
            <div className="flex-1 transition-all duration-300 mt-4 overflow-y-auto px-4">
                <div className="flex flex-col justify-between items-center mb-4">
                    <h2 className="text-4xl font-bold items-center">Explore</h2>
                </div>
                <div className="flex justify-end mb-6 ">
                {/*<button className="text-green-400 hover:text-green-300 flex items-center justify-center rounded-full border border-green-500 w-10 h-10">*/}
                {/*    <Plus className="w-5 h-5" />*/}
                {/*</button>*/}
                </div>


                {loading && (
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-900 border border-green-800 rounded-xl p-4 animate-pulse">
                                <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                                <div className="bg-gray-700 h-4 rounded mb-2"></div>
                                <div className="bg-gray-700 h-3 rounded w-20"></div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/20 border border-red-500 rounded-xl p-4 text-red-300">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="columns-1 sm:columns-2 md:columns-5 gap-4 space-y-4">
                        {streams.map((stream) => (
                            <div
                                key={stream.id}
                                className="break-inside-avoid bg-gray-900 border border-green-800 rounded-xl overflow-hidden hover:border-green-600 transition-colors cursor-pointer group"
                            >
                                <div className="relative">
                                    <img
                                        src={stream.url}
                                        alt={stream.title}
                                        className="w-full h-auto object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = "none";
                                            target.nextElementSibling?.classList.remove("hidden");
                                        }}
                                    />
                                    <div className="hidden bg-gradient-to-br from-gray-600 to-gray-800 w-full h-full rounded-lg flex items-center justify-center">
                                        <span className="text-gray-400">No Image</span>
                                    </div>

                                    <div className="absolute bottom-0 w-full bg-black/60 text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white font-bold text-sm">{stream.title}</span>
                                    </div>

                                    {/*<div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-xs">*/}
                                    {/*    {Math.floor(Math.random() * 1000)}+ viewers*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
