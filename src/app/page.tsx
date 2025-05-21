import { STREAMS } from "@/lib/constants";
import { StreamCard } from "@/components/stream-card";

export default function Home() {
  const featuredStreams = STREAMS.filter(stream => stream.isLive);
  const recentStreams = STREAMS.filter(stream => !stream.isLive);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
            Welcome to EchoVerse
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            The ultimate platform for gamers and content creators. Stream your gameplay, connect with viewers, and build your community.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/setup" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300">
              Start Streaming
            </a>
            <a href="#featured" className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-md font-medium transition-colors duration-300">
              Browse Streams
            </a>
          </div>
        </div>
      </section>

      {/* Featured Live Streams */}
      <section id="featured" className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">🔴 Live Now</h2>
          <a href="/browse" className="text-emerald-500 hover:text-emerald-600 text-sm font-medium transition-colors duration-300">
            View All
          </a>
        </div>
        {featuredStreams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredStreams.map(stream => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No live streams available right now.</p>
          </div>
        )}
      </section>

      {/* Recent Broadcasts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Broadcasts</h2>
          <a href="/browse?filter=recent" className="text-emerald-500 hover:text-emerald-600 text-sm font-medium transition-colors duration-300">
            View All
          </a>
        </div>
        {recentStreams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentStreams.map(stream => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No recent broadcasts available.</p>
          </div>
        )}
      </section>
    </div>
  );
}