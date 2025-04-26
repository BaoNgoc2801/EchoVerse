"use client";

import { useState } from "react";
import { Video } from "lucide-react"; // Using Lucide for icon
import { useRouter } from "next/navigation"; // Import useRouter

const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const router = useRouter();  // Initialize useRouter

    // Function to handle navigation to sign-in page
    const handleSignIn = () => {
        router.push("/auth/signin"); // Use router.push() to navigate to the sign-in page
    };

    return (
        <header className="bg-black text-white shadow-md py-4">
            <div className="mx-auto px-4 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <a href="/">
                        <img
                            src="/image/logo.png"
                            alt="Logo"
                            className="w-12 h-12 object-contain"
                        />
                    </a>
                    <h1 className="text-2xl font-bold">EchoVerse</h1>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-8">
                    <a href="/">Home</a>
                    <a href="/livestream">Livestream</a>
                    <a href="/profile">Profile</a>
                    <a href="/settings">Settings</a>
                </nav>

                {/* Search Bar and Sign In Button */}
                <div className="flex items-center space-x-4">
                    {/* Go Live Button */}
                    <a href="/livestream">
                        <button className="flex items-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-300">
                            <Video size={18} />
                            <span>Go Live</span>
                        </button>
                    </a>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-gray-800 text-white rounded-full px-4 py-2 w-72 focus:outline-none"
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

                    {/* Sign In Button (Using useRouter to navigate) */}
                    <button
                        onClick={handleSignIn} // Use onClick to handle navigation
                        className="bg-green-800 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300"
                    >
                        Sign In
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-2xl">
                    <i className="fas fa-bars"></i> {/* Hamburger icon */}
                </button>
            </div>
        </header>
    );
};

export default Header;
