type StreamCardProps = {
    title: string;
    viewers: number;
    thumbnail: string;
};

const StreamCard = ({ title, viewers, thumbnail }: StreamCardProps) => (
    <div className="bg-gray-700 p-2 rounded-lg">
        <img src={thumbnail} alt={title} className="w-full rounded-md" />
        <h3 className="text-white mt-2 text-sm font-bold">{title}</h3>
        <p className="text-gray-400 text-xs">{viewers} viewers</p>
    </div>
);

export default StreamCard;
