"use client";

import Link from "next/link";
import { useState } from "react";
import { Video, MessageCircle } from "lucide-react";
import AuthModal from "@/app/auth/page";
import ChatList from "@/components/chat-list/index";
import ChatPopup from "@/components/chat/chat";



const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showChatList, setShowChatList] = useState(false);
    const [selectedChat, setSelectedChat] = useState<null | { id: string; name: string; lastMessage: string; time: string }>(null);


    const openModal = () => {
        setShowAuthModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowAuthModal(false);
    };


    // Toggle the chat list visibility
    const toggleChatList = () => {
        setShowChatList((prev) => !prev);
    };

    const handleChatSelect = (chat: { id: string; name: string; lastMessage: string; time: string }) => {
        setSelectedChat(chat);
        setShowChatList(false);
    };

    const handleCloseChat = () => {
        setSelectedChat(null);
    };

    return (
        <header className="bg-black text-white shadow-lg py-4">
            <div className="mx-auto px-6 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-6">
                    <Link href="/">
                        <img
                            src="/image/logo.png"
                            alt="Logo"
                            className="w-14 h-14 object-contain"
                        />
                    </Link>
                    <h1 className="text-3xl font-semibold">EchoVerse</h1>
                </div>

                <nav className="flex space-x-8 items-center ml-auto">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-gray-800 text-white rounded-full px-6 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10.5 18h-.01M21 21l-6-6M10 4a6 6 0 10 0 12 6 6 0 000-12z"
                            />
                        </svg>
                    </div>

                    {/* Go Live Button */}
                    <Link href="/livestream">
                        <button
                            className="flex items-center space-x-2 bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition duration-300 mr-7"
                        >
                            <Video size={20} />
                            <span className="font-medium">Go Live</span>
                        </button>
                    </Link>
                </nav>

                {/* Search Bar and Sign In Button */}
                <div className="flex items-center space-x-6">
                    {/* Chat Icon */}
                    <div className="relative">
                        <MessageCircle
                            size={24}
                            className="text-white cursor-pointer hover:text-gray-300 transition duration-300"
                            onClick={toggleChatList}
                        />
                    </div>

                    {/* Sign In Button */}
                    <button
                        onClick={openModal} // Open the modal on click
                        className="bg-green-800 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300"
                    >
                        Sign In
                    </button>
                </div>

                {showChatList && <ChatList onChatSelect={handleChatSelect} />}
                {selectedChat && <ChatPopup chat={selectedChat} onClose={handleCloseChat} />}


                {/* Mobile Menu Button */}
                <button className="md:hidden text-2xl">
                    <i className="fas fa-bars"></i> {/* Hamburger icon */}
                </button>
            </div>

            {showAuthModal && <AuthModal onClose={closeModal} />}
        </header>
    );
};

export default Header;
