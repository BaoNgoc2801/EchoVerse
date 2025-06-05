"use client"

import {
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTrendingStreams } from "@/services/dashboard-api"
import { StreamItem } from "@/services/dashboard-api";

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
        setError('Failed to load trending streams');
        console.error('Error loading streams:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStreams();
  }, []);

  return (
      <div className="flex h-screen overflow-hidden ml-6">
        <div className="flex-1 transition-all duration-300 mt-4 overflow-y-auto">
          <div className="gap-6">
            <div className="col-span-8">
              <div className="bg-gradient-to-r from-green-900 via-green-800 to-black rounded-2xl p-8 mb-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-4xl font-bold mb-4 leading-tight">
                    Welcome to EchoVerse
                    <br />
                    Livestream Your World
                  </h1>
                  <p className="text-gray-300 mb-6 max-w-md">
                    Create your channel, go live, interact with your audience, and share unforgettable moments — all in one powerful platform.
                  </p>
                  <div className="flex space-x-4">
                    <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors">
                      Start Streaming
                    </button>
                    <button className="bg-transparent border border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors">
                      Discover Channels
                    </button>
                  </div>
                </div>
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg transform rotate-12 opacity-90"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg transform -rotate-12"></div>
                  </div>
                </div>
              </div>

              {/* Trending Livestreams */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Trending Livestreams</h2>
                  <button className="text-green-400 hover:text-green-300 flex items-center">
                    View More <span className="ml-2">→</span>
                  </button>
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
                    <div className="grid grid-cols-3 gap-4">
                      {streams.map((stream) => (
                          <div
                              key={stream.id}
                              className="bg-gray-900 border border-green-800 rounded-xl p-4 hover:border-green-600 transition-colors cursor-pointer"
                          >
                            <div className="h-48 rounded-lg mb-4 relative overflow-hidden">
                              <img
                                  src={stream.url}
                                  alt={stream.title}
                                  className="w-full h-full object-cover rounded-lg"
                                  onError={(e) => {
                                    // Fallback to gradient if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                  }}
                              />
                              <div className="hidden bg-gradient-to-br from-gray-600 to-gray-800 w-full h-full rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                              </div>
                              <div className="absolute top-3 left-3 bg-red-500 px-2 py-1 rounded-full text-xs font-bold">
                                LIVE
                              </div>
                              <div className="absolute top-3 right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Heart className="w-4 h-4 text-red-500" />
                              </div>
                              <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-xs">
                                {Math.floor(Math.random() * 1000)}+ viewers
                              </div>
                            </div>
                            <h3 className="font-semibold mb-2 truncate">{stream.title}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              </div>
                              <span>Join</span>
                            </div>
                          </div>
                      ))}

                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;