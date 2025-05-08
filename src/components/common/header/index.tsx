"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Video, MessageCircle, Search } from "lucide-react";
import AuthModal from "@/app/auth/page";
import ChatList from "@/components/chat-list/index";
import ChatPopup from "@/components/chat/chat";

const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showChatList, setShowChatList] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        // Check if dark mode is set in document
        const isDarkMode = document.documentElement.classList.contains('dark');
        setDarkMode(isDarkMode);
    }, []);

    const openModal = () => {
        setShowAuthModal(true);
    };

    const closeModal = () => {
        setShowAuthModal(false);
    };

    const toggleChatList = () => {
        setShowChatList((prev) => !prev);
    };

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        setShowChatList(false);
    };

    const handleCloseChat = () => {
        setSelectedChat(null);
    };

    return (
        <header className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500'} text-white shadow-lg py-3`}>
            <div className="mx-auto px-6 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-6">
                    <Link href="/">
                        <div className="flex items-center">
                            <img
                                src="/image/logo.png"
                                alt="Logo"
                                className="w-12 h-12 object-contain"
                            />
                            <h1 className="text-3xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600">
                                EchoVerse
                            </h1>
                        </div>
                    </Link>
                </div>

                <nav className="hidden md:flex space-x-8 items-center ml-auto">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-green-700/30 border-emerald-400/30'} text-white rounded-full px-10 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300 border`}
                        />
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-200"
                        />
                    </div>

                    {/* Go Live Button */}
                    <Link href="/livestream">
                        <button className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-500 text-white py-2 px-6 rounded-full hover:from-red-700 hover:to-red-600 transition duration-300 shadow-md shadow-red-900/20">
                            <Video size={20} />
                            <span className="font-medium">Go Live</span>
                        </button>
                    </Link>
                </nav>

                {/* Sign In and Chat */}
                <div className="flex items-center space-x-6">
                    {/* Chat Icon */}
                    <div className="relative">
                        <div className={`p-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-teal-600/50 hover:bg-emerald-600'} rounded-full transition-all`}>
                            <MessageCircle
                                size={22}
                                className="text-white cursor-pointer"
                                onClick={toggleChatList}
                            />
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                        onClick={openModal}
                        className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white py-2 px-6 rounded-full hover:from-green-500 hover:via-emerald-600 hover:to-teal-700 transition duration-300 shadow-md shadow-teal-700/30 font-medium"
                    >
                        Sign In
                    </button>
                </div>

                {showChatList && <ChatList onChatSelect={handleChatSelect} />}
                {selectedChat && <ChatPopup chat={selectedChat} onClose={handleCloseChat} />}

                {/* Mobile Menu Button */}
                <button className={`md:hidden p-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-teal-600/50 hover:bg-emerald-600'} rounded-full transition-all`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="4" y1="12" x2="20" y2="12"></line>
                        <line x1="4" y1="6" x2="20" y2="6"></line>
                        <line x1="4" y1="18" x2="20" y2="18"></line>
                    </svg>
                </button>
            </div>

            {showAuthModal && <AuthModal onClose={closeModal} />}
        </header>
    );
};


export default Header;