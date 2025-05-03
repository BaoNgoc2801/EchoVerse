'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Video } from "lucide-react"; // Using Lucide for icon
import { useRouter } from "next/navigation"; // Import useRouter


const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [userInfo, setUserInfo] = useState({ username: '', avatar: '' });
    const [isAvatarClicked, setIsAvatarClicked] = useState(false); // State to handle avatar click
    const router = useRouter();  // Initialize useRouter

    useEffect(() => {
        // Check if the user is logged in by checking localStorage
        const username = localStorage.getItem('username');

        if (username) {
            setUserInfo({ username, avatar: username.charAt(0).toUpperCase() }); // Get the first letter of username
        }
    }, []);


    // Function to handle navigation to sign-in page
    const handleSignIn = () => {
        router.push("/auth/signin"); // Use router.push() to navigate to the sign-in page
    };
    const handleSignOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUserInfo({ username: '', avatar: '' });
        setIsAvatarClicked(false); // Close the "Sign Out" option after sign out
    };

    const toggleAvatarMenu = () => {
        setIsAvatarClicked(!isAvatarClicked); // Toggle visibility of the Sign Out button
    };

    return (
        <header className="bg-black text-white shadow-md py-4">
            <div className="mx-auto px-4 flex items-center justify-between relative">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <img
                            src="/image/logo.png"
                            alt="Logo"
                            className="w-12 h-12 object-contain"
                        />
                    </Link>
                    <h1 className="text-2xl font-bold">EchoVerse</h1>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-8">
                    <Link href="/">Home</Link>
                    <Link href="/livestream">Livestream</Link>
                    <Link href="/profile">Profile</Link>
                    <Link href="/settings">Settings</Link>
                </nav>

                {/* Search Bar and Sign In Button or User Info */}
                <div className="flex items-center space-x-4">
                    {/* Go Live Button */}
                    <Link href="/livestream">
                        <button className="flex items-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-300">
                            <Video size={18} />
                            <span>Go Live</span>
                        </button>
                    </Link>

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

                    {/* If user is logged in, show username and avatar */}
                    {userInfo.username ? (
                        <div className="flex items-center space-x-2 relative">
                            {/* User Info (name) */}
                            <span className="text-white">{userInfo.username}</span>

                            {/* Avatar Section */}
                            <div
                                onClick={toggleAvatarMenu}  // Toggle avatar click
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white cursor-pointer"
                            >
                                {userInfo.avatar}
                            </div>

                            {/* Avatar Menu (Sign Out button) */}
                            {isAvatarClicked && (  // Only show Sign Out when avatar is clicked
                                <div className="absolute top-10 right-0 bg-gray-800 text-white rounded-lg shadow-lg w-48 p-3 mt-2">
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-red-500 bg-white py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // If user is not logged in, show Sign In button
                        <button
                            onClick={handleSignIn}
                            className="bg-green-800 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300"
                        >
                            Sign In
                        </button>
                    )}
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
