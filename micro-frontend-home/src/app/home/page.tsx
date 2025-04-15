import React, { FC } from 'react';
import Index from "../../components/videoCard";


const HomePage: FC = () => {
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

    return (
        <div>
            <div className="bg-black text-white min-h-screen px-4 md:px-6">
                {/* Hot Section */}
                <section className="py-8 w-full">
                    <h2 className="text-xl font-bold pb-4">Hot</h2>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {streams.map((stream) => (
                            <Index key={stream.id} stream={stream} />
                        ))}
                    </div>
                </section>

                {/* Suggested Section */}
                <section className="py-8 w-full">
                    <h2 className="text-xl font-bold pb-4">Suggested</h2>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {streams.map((stream) => (
                            <Index key={stream.id} stream={stream} />
                        ))}
                    </div>
                </section>

                {/* Ranking Section */}
                <section className="py-8 w-full">
                    <h2 className="text-xl font-bold pb-4">Leaderboard</h2>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {streams.map((stream) => (
                            <Index key={stream.id} stream={stream} />
                        ))}
                    </div>
                </section>
            </div>

        </div>
    );
};

export default HomePage;
