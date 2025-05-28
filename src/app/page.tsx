import { STREAMS } from "@/lib/constants";
import { StreamCard } from "@/components/stream-card";
import {ArrowRight, Zap} from "lucide-react";

export default function Home() {
  const featuredStreams = STREAMS.filter(stream => stream.isLive);
  const recentStreams = STREAMS.filter(stream => !stream.isLive);

  return (
      <div className="container mx-auto px-4 py-8 bg-background min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28 mb-6 w-full">
          <div
              className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-900/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/30 from-gray-200 via-gray-100 to-emerald-100/30 z-0"></div>
          <div
              className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10 dark:opacity-10 opacity-20 z-0"
              aria-hidden="true"
          ></div>
          <div
              className="absolute inset-0 bg-[radial-gradient(#20b486_1px,transparent_1px)] bg-[length:20px_20px] opacity-5 z-0"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text inline-block">
                Welcome to EchoVerse
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 text-gray-600 mb-10 max-w-3xl mx-auto">
                The ultimate platform for gamers and content creators. Stream your
                gameplay, connect with viewers, and build your community.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <a
                    href="/setup"
                    className="group inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-600/20"
                >
                  <Zap className="w-5 h-5 mr-2 transition-transform group-hover:animate-pulse"/>
                  <span>Start Streaming</span>
                </a>
                <a
                    href="#featured"
                    className="group inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-200 hover:bg-gray-300 text-white dark:text-white text-gray-800 px-8 py-4 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-gray-800/20 dark:hover:shadow-gray-800/20 hover:shadow-gray-200/20"
                >
                  <span>Browse Streams</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"/>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Live Streams */}
        <section id="featured" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">🔴 Live Now</h2>
            <a
                href="/browse"
                className="text-emerald-500 hover:text-emerald-600 text-sm font-medium transition-colors duration-300"
            >
              View All
            </a>
          </div>
          {featuredStreams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredStreams.map(stream => (
                    <StreamCard key={stream.id} stream={stream}/>
                ))}
              </div>
          ) : (
              <div className="bg-muted/30 rounded-lg p-8 text-center border border-border">
                <p className="text-muted-foreground">No live streams available right now.</p>
              </div>
          )}
        </section>

        {/* Recent Broadcasts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Broadcasts</h2>
            <a
                href="/browse?filter=recent"
                className="text-emerald-500 hover:text-emerald-600 text-sm font-medium transition-colors duration-300"
            >
              View All
            </a>
          </div>
          {recentStreams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recentStreams.map(stream => (
                    <StreamCard key={stream.id} stream={stream}/>
                ))}
              </div>
          ) : (
              <div className="bg-muted/30 rounded-lg p-8 text-center border border-border">
                <p className="text-muted-foreground">No recent broadcasts available.</p>
              </div>
          )}
        </section>
      </div>
  );
}