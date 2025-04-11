// src/app/livestream/page.tsx
'use client';  // This ensures this component is treated as a client-side component

import React, { useState } from 'react';

const Livestream = ({ params }: { params: { id: string } }) => {
    const [comments, setComments] = useState<string[]>([]);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Cast event target to HTMLFormElement and access the input element
        const form = e.target as HTMLFormElement;
        const commentInput = form.elements.namedItem('comment') as HTMLInputElement;
        if (commentInput && commentInput.value) {
            setComments([...comments, commentInput.value]);
            commentInput.value = ''; // Clear the input after submitting
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Video Player */}
                <div className="flex-1">
                    <div className="bg-gray-800 h-[400px] flex items-center justify-center">
                        {/* Replace with actual video */}
                        <h2 className="text-white text-2xl">Live Video Stream {params.id}</h2>
                    </div>
                </div>

                {/* Chatbox */}
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-4">Live Chat</h2>
                    <div className="bg-gray-700 p-4 rounded-lg h-[400px] overflow-y-auto">
                        {comments.map((comment, index) => (
                            <div key={index} className="text-white mb-2">
                                <strong>User {index + 1}:</strong> {comment}
                            </div>
                        ))}
                    </div>

                    <form className="mt-4" onSubmit={handleCommentSubmit}>
                        <input
                            type="text"
                            name="comment"
                            className="w-full p-3 bg-gray-800 text-white rounded-lg"
                            placeholder="Type your comment here"
                        />
                        <button
                            type="submit"
                            className="mt-2 w-full p-3 bg-blue-600 text-white rounded-lg"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Livestream;
