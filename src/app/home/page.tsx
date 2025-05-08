"use client"

import { FC, useEffect, useState } from "react";
import VideoCard from "../../components/ui/videoCard";
import LayoutWithHeader from "../../components/layout/layout-with-header";
import { Moon, Sun } from "lucide-react";

const HomePage: FC = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const streams = [
        { id: 1, title: "VirUs Reaction", user: "VirUs", viewers: "7.7k", thumbnail: "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/4/3/48687527111259639359981425026650736788746036n-1743674590384536834819.jpg" },
        { id: 2, title: "Dev Handsome on the mic", user: "Dev Nguyen", viewers: "11.5k", thumbnail: "https://i1.sndcdn.com/artworks-yMvGwOze5LCVZbqy-ybPkgQ-t500x500.jpg" },
        { id: 3, title: "Do Mixi", user: "Mixi", viewers: "1.3k", thumbnail: "https://kenh14cdn.com/203336854389633024/2021/8/13/-16288452393801288406942.jpg" },
        { id: 4, title: "Chi Phien", user: "Chi Phien", viewers: "1.0k", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjs2OjxpuDEXArDvZad1jw22ihXVby015c6w&s" },
        { id: 5, title: "Sena Live", user: "Sena", viewers: "10.2k", thumbnail: "https://i.ytimg.com/vi/sC2sEm0UBVQ/maxresdefault.jpg" },
        { id: 6, title: "TFT LOL", user: "Thầy Giáo Ba", viewers: "8.5k", thumbnail: "https://cdn.oneesports.vn/cdn-data/wp-content/uploads/sites/4/2020/01/lmht-ba-ga-mv-tet-1024x576.jpg" },
        { id: 7, title: "Red Kim Chi", user: "Linda", viewers: "5.6k", thumbnail: "https://anhchibi.com/wp-content/uploads/2025/01/linda-cam-suc-meme.jpg" },
        // More stream objects...
    ];

    const trendingStreams = [...streams].sort(() => Math.random() - 0.5).slice(0, 5);
    const suggestedStreams = [...streams].sort(() => Math.random() - 0.5);

    const topStreamers = [...streams].sort((a, b) => {
        return parseInt(b.viewers.replace(/[^0-9.]/g, '')) - parseInt(a.viewers.replace(/[^0-9.]/g, ''));
    }).slice(0, 5);

    return (
        <LayoutWithHeader>
            <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} min-h-screen`}>
                {/* Theme toggle button */}
                <div className="fixed top-6 right-6 z-50">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white shadow-lg flex items-center justify-center"
                        aria-label="Toggle theme"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Hero Banner */}
                <div className="w-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 py-12 px-4 md:px-8">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Live Streams</h1>
                        <p className="text-lg text-white/90 max-w-2xl">Watch your favorite streamers, discover new content, and join the conversation with thousands of viewers worldwide.</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
                    {/* Trending Section */}
                    <section className="py-8 w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold inline-flex items-center">
                                <span className="mr-2">🔥</span> Trending Now
                            </h2>
                            <a href="#" className="text-green-400 hover:text-green-300 font-medium">View All</a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {trendingStreams.map((stream) => (
                                <VideoCard key={stream.id} stream={stream} />
                            ))}
                        </div>
                    </section>

                    {/* Suggested Section with gradient card bg */}
                    <section className="py-8 w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold inline-flex items-center">
                                <span className="mr-2">✨</span> Recommended For You
                            </h2>
                            <a href="#" className="text-green-400 hover:text-green-300 font-medium">Refresh</a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {suggestedStreams.map((stream) => (
                                <VideoCard key={stream.id} stream={stream} />
                            ))}
                        </div>
                    </section>

                    {/* Top Streamers Section */}
                    <section className="py-8 w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold inline-flex items-center">
                                <span className="mr-2">🏆</span> Top Streamers
                            </h2>
                            <a href="#" className="text-green-400 hover:text-green-300 font-medium">See Full Leaderboard</a>
                        </div>

                        <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                            {topStreamers.map((streamer, index) => (
                                <div key={streamer.id} className={`flex items-center p-4 ${index < topStreamers.length - 1 ? 'border-b border-gray-700' : ''}`}>
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-full mr-4">
                                        {index + 1}
                                    </div>
                                    <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                                        <img src={streamer.thumbnail} alt={streamer.user} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-medium">{streamer.user}</h3>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{streamer.title}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-400 to-teal-500 text-white">
                                            {streamer.viewers} viewers
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </LayoutWithHeader>
    );
};

export default HomePage;