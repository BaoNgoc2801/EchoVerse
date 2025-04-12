"use client"

import React, { useState } from "react";

const Chat: React.FC = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    const sendMessage = () => {
        if (message) {
            setMessages((prevMessages) => [...prevMessages, message]);
            setMessage("");
        }
    };

    return (
        <div className="p-4 bg-gray-800 text-white w-full max-w-lg mx-auto mt-4 rounded-lg">
            <div className="h-64 overflow-auto p-2 bg-gray-700 rounded-md mb-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className="p-2 mb-2 bg-gray-600 rounded">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-grow p-2 rounded bg-gray-600 text-white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button
                    className="bg-blue-600 px-4 py-2 rounded"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
