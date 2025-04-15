import { FC } from "react";
import Link from "next/link";

interface VideoCardProps {
    stream: { id: number; title: string; user: string; viewers: string; thumbnail: string };
}

const Index: FC<VideoCardProps> = ({ stream }) => {
    return (
        <div className="w-full sm:w-70 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img className="w-full h-40 object-cover" src={stream.thumbnail} alt={stream.title} />
            <div className="p-4">
                <h3 className="text-white text-lg font-bold">{stream.title}</h3>
                <p className="text-gray-400">{stream.user}</p>
                <p className="text-gray-300">{stream.viewers} viewers</p>
                <Link href={`/livestream/${stream.id}`} passHref>
                    <button className="mt-2 bg-green-700 text-white py-2 px-4 rounded-full w-full">Join</button>
                </Link>
            </div>
        </div>
    );
};

export default Index;