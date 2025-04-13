import React from "react";

type Message = {
    id: string;
    text: string;
    sender: string;
    time: string;
};

type Chat = {
    id: string;
    name: string;
    messages: Message[];
};

const mockChat: Chat = {
    id: "1",
    name: "Akina Oanh",
    messages: [
        { id: "1", text: "Hey, how are you?", sender: "Akina Oanh", time: "10:30 AM" },
        { id: "2", text: "I'm good, how about you?", sender: "You", time: "10:31 AM" },
        { id: "3", text: "I'm doing well, thanks!", sender: "Akina Oanh", time: "10:32 AM" },
        { id: "4", text: "What are you up to today?", sender: "Akina Oanh", time: "10:33 AM" },
    ],
};

const ChatPopup = ({ chat = mockChat, onClose }: { chat: Chat; onClose: () => void }) => {
    return (
        <div className="fixed bottom-6 right-6 bg-white text-black shadow-lg rounded-lg w-80 p-4 z-20 max-h-96">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-xl">{chat.name}</h3>
                <button onClick={onClose} className="text-gray-500 text-xl">
                    X
                </button>
            </div>

            <div className="h-60 overflow-auto mb-4">
                {/* Displaying messages */}
                <div className="space-y-4">
                    {chat.messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"} items-start`}>
                            <div className={`text-sm text-gray-600 max-w-xs ${message.sender === "You" ? "bg-blue-100" : "bg-gray-100"} p-2 rounded-lg`}>
                                <div className="font-semibold">{message.sender}</div>
                                <div>{message.text}</div>
                                <div className="text-xs text-gray-400">{message.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="bg-gray-100 text-sm p-2 w-full rounded-lg focus:outline-none"
                />
                <button className="bg-blue-500 text-white p-2 rounded-full">Send</button>
            </div>
        </div>
    );
};

export default ChatPopup;
