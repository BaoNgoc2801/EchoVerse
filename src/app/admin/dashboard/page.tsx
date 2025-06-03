"use client"

import {
  Search,
  Bell,
  User,
  Grid3X3,
  // Bookmark,
  Settings,
  // Palette,
  // TrendingUp,
  Heart,
  Menu,
  X,
} from "lucide-react";
import {useEffect, useState} from "react";
import { fetchTrendingStreams } from "@/services/dashboard-api"
import { StreamItem } from "@/services/dashboard-api";


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [streams, setStreams] = useState<StreamItem[]>([]);

  useEffect(() => {
    const loadStreams = async () => {
      const data = await fetchTrendingStreams()
      setStreams(data)
    }

    loadStreams()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Toggle Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
        >
          {sidebarOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-gradient-to-b from-green-900 to-black border-r border-green-800 flex flex-col py-4 transition-all duration-300 ease-in-out h-screen relative overflow-hidden`}
      >
        {/* Logo */}
        <div
          className={`${
            sidebarOpen ? "px-6 mb-8" : "px-4 mb-8"
          } flex items-center`}
        >
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Grid3X3 className="w-6 h-6" />
          </div>
        </div>

        {/* Navigation Items */}
        <div className={`${sidebarOpen ? "px-6" : "px-4"} space-y-2 flex-1`}>
          {[
            { icon: Grid3X3, label: "Dashboard", active: true },
            { icon: User, label: "Top Streamer", active: false },
            { icon: Settings, label: "Settings", active: false },
            { icon: Bell, label: "Message", active: false },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center ${
                sidebarOpen ? "px-3" : "justify-center"
              } py-3 rounded-lg cursor-pointer transition-colors ${
                item.active ? "bg-green-800" : "hover:bg-green-800"
              }`}
            >
              <item.icon className="w-5 h-5 text-orange-400" />
              {sidebarOpen && (
                <span className="ml-3 text-white">{item.label}</span>
              )}
            </div>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className={`${sidebarOpen ? "px-6" : "px-4"} mt-auto`}>
          <div
            className={`flex ${
              sidebarOpen ? "justify-between" : "justify-center"
            } items-center`}
          >
            {sidebarOpen ? (
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button className="flex items-center px-3 py-2 rounded-md bg-orange-500 text-black text-sm font-medium">
                  <span className="mr-2">🌙</span>
                  Dark
                </button>
                <button className="flex items-center px-3 py-2 rounded-md text-gray-400 text-sm font-medium hover:text-white">
                  <span className="mr-2">☀️</span>
                  Light
                </button>
              </div>
            ) : (
              <button className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span>🌙</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search livestream"
              className="w-full bg-gray-900 border border-green-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-600"
            />
          </div>

        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Content */}
          <div className="col-span-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-900 via-green-800 to-black rounded-2xl p-8 mb-6 relative overflow-hidden ">
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

            {/* Trending NFT */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Trending Livestreams</h2>
                <button className="text-green-400 hover:text-green-300 flex items-center">
                  View More <span className="ml-2">→</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {streams.map((stream) => (
                    <div
                        key={stream.id}
                        className="bg-gray-900 border border-green-800 rounded-xl p-4 hover:border-green-600 transition-colors"
                    >
                      <div className="h-48 rounded-lg mb-4 relative overflow-hidden">
                        <img
                            src={stream.url}
                            alt={stream.title}
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute top-3 right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black text-sm font-bold">❤</span>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{stream.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <div className="w-6 h-6 bg-purple-600 rounded-full" />
                        <span>Live</span>
                      </div>
                    </div>
                ))}


                <div className="bg-gray-900 border border-green-800 rounded-xl p-4 hover:border-green-600 transition-colors">
                  <div className="bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600 h-48 rounded-lg mb-4 relative">
                    <div className="absolute top-3 right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Full Abstract</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-6 h-6 bg-pink-600 rounded-full"></div>
                    <span>Esther Howard</span>
                    <span>Creator</span>
                  </div>
                </div>

                <div className="bg-gray-900 border border-green-800 rounded-xl p-4 hover:border-green-600 transition-colors">
                  <div className="bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 h-48 rounded-lg mb-4 relative">
                    <div className="absolute top-3 right-3 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">The Fantasy Flower</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                    <span>Esther Howard</span>
                    <span>Creator</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Top Sellers */}
            <div className="bg-gray-900 border border-green-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Top Streamers</h2>
                <button className="text-green-400 hover:text-green-300 text-sm">
                  View All →
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-green-600 rounded-full"></div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                        1
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">Esther Howard</div>
                      <div className="text-sm text-gray-400">
                        0.00000301 BTC
                      </div>
                    </div>
                  </div>
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                    Following
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-purple-600 rounded-full"></div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                        2
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">Guy Hawkins</div>
                      <div className="text-sm text-gray-400">
                        0.00000300 BTC
                      </div>
                    </div>
                  </div>
                  <button className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-3 py-1 rounded text-sm transition-colors">
                    Follow
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                        3
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">Robert Fox</div>
                      <div className="text-sm text-gray-400">
                        0.00000278 BTC
                      </div>
                    </div>
                  </div>
                  <button className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-3 py-1 rounded text-sm transition-colors">
                    Follow
                  </button>
                </div>
              </div>
            </div>

            {/* Live Auctions */}
            <div className="bg-gray-900 border border-green-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Live Actions</h2>
                <button className="text-green-400 hover:text-green-300 text-sm">
                  EXPLORE MORE →
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-xl p-3">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 h-24 rounded-lg mb-3 relative">
                    <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-xs">❤</span>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">Colorful Abstract</h3>
                  <div className="text-sm text-gray-400 mb-2">
                    Highest bid: 1.45 ETH
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm font-semibold transition-colors">
                      Place a Bid
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-3">
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 h-24 rounded-lg mb-3 relative">
                    <div className="absolute top-2 right-2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-xs">❤</span>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">Modern Art Collection</h3>
                  <div className="text-sm text-gray-400 mb-2">
                    Highest bid: 3.84 ETH
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm font-semibold transition-colors">
                      Place a Bid
                    </button>
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="flex justify-center space-x-2 mt-4 text-sm">
                <div className="bg-gray-800 px-2 py-1 rounded">02</div>
                <div className="bg-gray-800 px-2 py-1 rounded">28</div>
                <div className="bg-gray-800 px-2 py-1 rounded">25</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
