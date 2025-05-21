export default function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-purple-700">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Welcome to LiveStream</h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Discover amazing content from creators around the world or start your own stream today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/browse"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-md transition"
          >
            Browse Streams
          </a>
          <a
            href="/go-live"
            className="bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 px-6 rounded-md transition"
          >
            Start Streaming
          </a>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background z-10"></div>
    </section>
  );
}