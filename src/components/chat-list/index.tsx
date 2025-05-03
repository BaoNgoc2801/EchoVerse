"use client";

import React from "react";

type Chat = {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
};

const mockChats: Chat[] = [
    { id: "1", name: "Akina Oanh", lastMessage: "Tin nhắn đang chờ mới", time: "10:30 AM" },
    { id: "2", name: "Nhóm học tập", lastMessage: "Anh: giống facebook", time: "6 phút" },
    { id: "3", name: "Thu Diễm", lastMessage: "Polpot thời đại mới: Vaiz", time: "46 phút" },
    { id: "4", name: "Tuyển vắng lai TP Thủ Đức 1", lastMessage: "Team mình tuyển t...", time: "45 phút" },
    { id: "5", name: "A", lastMessage: "Như: 🔥 HACK BẢN THÂN T...", time: "1 giờ" },
    { id: "6", name: "IU PASS Community", lastMessage: "Kỳ: Minh có các môn", time: "5 giờ" },
];

const ChatList = ({ onChatSelect }: { onChatSelect: (chat: Chat) => void }) => {
    return (
        <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg w-80 p-4 z-10 max-h-80 overflow-auto">
            <h3 className="font-bold text-2xl mb-2 text-black">Chat</h3>
            <ul>
                {mockChats.map((chat) => (
                    <li
                        key={chat.id}
                        className="flex justify-between items-center py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 px-2 rounded"
                        onClick={() => onChatSelect(chat)}
                    >
                        <div>
                            <div className="font-semibold text-black">{chat.name}</div>
                            <div className="text-sm text-gray-500">{chat.lastMessage}</div>
                        </div>
                        <span className="text-xs text-gray-400">{chat.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
