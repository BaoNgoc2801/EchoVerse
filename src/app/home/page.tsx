import { FC } from "react";
import VideoCard from "../../components/ui/videoCard";
import LayoutWithHeader from "../../components/layout/layout-with-header";

const HomePage: FC = () => {
    const streams = [
        { id: 1, title: "VirUs Reaction", user: "VirUs", viewers: "7.7k", thumbnail: "/image/virus.png" },
        { id: 2, title: "Dev Handsome on the mic", user: "Dev Nguyen", viewers: "11.5k", thumbnail: "/image/dev.png" },
        { id: 3, title: "NimoShow", user: "Bé Hồng", viewers: "1.3k", thumbnail: "/image/bhong.png" },
        { id: 4, title: "Idol Can Sing", user: "Idol", viewers: "1.0k", thumbnail: "/image/idol.png" },
        { id: 5, title: "Happy New Year", user: "Nhac Nguyen", viewers: "10.2k", thumbnail: "/image/nhac.png" },
        { id: 6, title: "TFT LOL", user: "Thầy Giáo Ba", viewers: "8.5k", thumbnail: "/image/tftlol.png" },
        { id: 7, title: "NimoShow", user: "Trâm Anh", viewers: "5.6k", thumbnail: "/image/tram.png" },
        // More stream objects...
    ];

    return (
        <LayoutWithHeader>
            <div className="bg-black text-white min-h-screen px-4 md:px-6"> {/* Adjust padding here */}
                {/* Hot Section */}
                <section className="py-8 w-full">
                    <h2 className="text-xl font-bold pb-4">Hot</h2>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {streams.map((stream) => (
                            <VideoCard key={stream.id} stream={stream} />
                        ))}
                    </div>
                </section>

                {/* Suggested Section */}
                <section className="py-8 w-full">
                    <h2 className="text-xl font-bold pb-4">Suggested</h2>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {streams.map((stream) => (
                            <VideoCard key={stream.id} stream={stream} />
                        ))}
                    </div>
                </section>

                {/* Ranking Section */}
                <section className="py-8 w-full">
                    <h2 className="text-xl font-bold pb-4">Leaderboard</h2>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {streams.map((stream) => (
                            <VideoCard key={stream.id} stream={stream} />
                        ))}
                    </div>
                </section>
            </div>
        </LayoutWithHeader>
    );
};

export default HomePage;
