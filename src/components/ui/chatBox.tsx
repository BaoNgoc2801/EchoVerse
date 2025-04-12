import { FC, useState } from "react";

const ChatBox: FC = () => {
    const [comment, setComment] = useState("");
    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(comment);  // You can add functionality to send the comment here
        setComment("");
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
            <div className="overflow-y-scroll h-64 mb-4">
                {/* Display live comments */}
            </div>
            <form onSubmit={handleCommentSubmit} className="flex">
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter comment..."
                    className="w-full p-2 rounded-l-lg text-gray-900"
                />
                <button type="submit" className="bg-blue-600 p-2 rounded-r-lg text-white">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;
