import { FC } from "react";
import { Play, Users } from "lucide-react";

interface StreamProps {
    id: number;
    title: string;
    user: string;
    viewers: string;
    thumbnail: string;
}

interface VideoCardProps {
    stream: StreamProps;
}

const VideoCard: FC<VideoCardProps> = ({ stream }) => {
    return (
        <div className="group cursor-pointer transition-all duration-300 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 light:from-white light:to-gray-100 hover:shadow-lg hover:shadow-green-500/20 border border-transparent hover:border-green-500/30">
            {/* Thumbnail with hover overlay */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>

                {/* Play button overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-12 w-12 rounded-full bg-green-500/80 hover:bg-green-500 flex items-center justify-center">
                        <Play size={24} className="text-white ml-1" />
                    </div>
                </div>

                {/* Viewers count */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Users size={12} className="mr-1" />
                    <span>{stream.viewers}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                <h3 className="font-medium text-white dark:text-white light:text-gray-800 line-clamp-1 mb-1">
                    {stream.title}
                </h3>
                <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                    {stream.user}
                </p>

                {/* Live indicator */}
                <div className="mt-2 flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                    <span className="text-xs text-red-500 font-medium">LIVE</span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;