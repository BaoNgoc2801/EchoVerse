import { STREAMS } from "@/lib/constants";
import { StreamCard } from "@/components/stream-card";
import { ArrowRight, Zap } from "lucide-react";

export default function Home() {
  const featuredStreams = STREAMS.filter((stream) => stream.isLive);
  const recentStreams = STREAMS.filter((stream) => !stream.isLive);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-900/30 z-0"></div>
        <div
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10 z-0"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(#20b486_1px,transparent_1px)] bg-[length:20px_20px] opacity-5 z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text inline-block">
              Welcome to EchoVerse
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              The ultimate platform for gamers and content creators. Stream your gameplay, connect with viewers, and build your community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <a
                href="/setup"
                className="group inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-600/20"
              >
                <Zap className="w-5 h-5 mr-2 transition-transform group-hover:animate-pulse" />
                <span>Start Streaming</span>
              </a>
              <a
                href="#featured"
                className="group inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-gray-800/20"
              >
                <span>Browse Streams</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-gray-900 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Streams */}
          <section id="featured" className="py-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Live Now</h2>
              </div>
              <a
                href="/browse"
                className="group flex items-center text-emerald-400 hover:text-emerald-300 text-sm md:text-base font-medium transition-colors duration-300"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {featuredStreams.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {featuredStreams.map((stream) => (
                  <div
                    key={stream.id}
                    className="transition-transform transform hover:scale-[1.03] hover:-translate-y-1 rounded-lg overflow-hidden bg-gray-900 shadow-lg shadow-black/50"
                  >
                    <StreamCard stream={stream} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-xl p-10 text-center border border-gray-700">
                <p className="text-gray-400 text-lg">No live streams available right now.</p>
                <p className="text-gray-500 mt-2">Check back later or browse recent broadcasts below.</p>
              </div>
            )}
          </section>

          {/* Recent Broadcasts */}
          <section className="py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Recent Broadcasts</h2>
              <a
                href="/browse?filter=recent"
                className="group flex items-center text-emerald-400 hover:text-emerald-300 text-sm md:text-base font-medium transition-colors duration-300"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {recentStreams.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {recentStreams.map((stream) => (
                  <div
                    key={stream.id}
                    className="transition-transform transform hover:scale-[1.03] hover:-translate-y-1 rounded-lg overflow-hidden bg-gray-900 shadow-lg shadow-black/50"
                  >
                    <StreamCard stream={stream} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-xl p-10 text-center border border-gray-700">
                <p className="text-gray-400 text-lg">No recent broadcasts available.</p>
                <p className="text-gray-500 mt-2">Follow your favorite streamers to see their content here.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
