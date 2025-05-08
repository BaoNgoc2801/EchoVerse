"use client";
import React, { useState, useEffect } from 'react';
import { Camera, User, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import LayoutWithHeader from "../../../components/layout/layout-with-header";
import { uploadImage } from "@/services/profile-api";
import ThemeToggle from "@/components/ui/themeToggle";

const Profile = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Local states
    const [showMore, setShowMore] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [cover, setCover] = useState<string | null>(null);
    const userId = "123"; // Replace with dynamic userId

    // Handle theme mounting to prevent hydration mismatch
    useEffect(() => {
        setMounted(true);

        // Check if dark mode is already set in localStorage or system preference
        const isDarkMode = document.documentElement.classList.contains('dark');
        setDarkMode(isDarkMode);
    }, []);

    const handleUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "avatar" | "cover"
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadedUrl = await uploadImage(file, type, userId);
        if (uploadedUrl) {
            type === "avatar" ? setAvatar(uploadedUrl) : setCover(uploadedUrl);
        } else {
            alert(`Failed to upload ${type}`);
        }
    };

    // Synchronize darkMode state with the ThemeToggle component
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDarkMode = document.documentElement.classList.contains('dark');
                    setDarkMode(isDarkMode);
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    // Prevent hydration mismatch by rendering after mount
    if (!mounted) {
        return null;
    }

    const isDark = darkMode;

    return (
        <LayoutWithHeader>
            <div className={`w-full min-h-screen transition-colors duration-300 ${
                isDark
                    ? 'bg-gray-900 text-gray-100'
                    : 'bg-gradient-to-br from-emerald-50 to-green-100 text-gray-800'
            }`}>
                {/* Theme Toggle Component */}
                <ThemeToggle />

                <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-12">
                    <div className={`rounded-3xl shadow-xl overflow-hidden border ${
                        isDark
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-white border-green-100'
                    }`}>
                        {/* Cover */}
                        <div className="relative h-72 w-full">
                            <img
                                src={cover || "https://via.placeholder.com/1200x300"}
                                alt="Cover"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            <label className={`absolute top-4 right-4 p-2 rounded-full shadow-lg cursor-pointer transition-all duration-300 group ${
                                isDark
                                    ? 'bg-gray-800/90 hover:bg-gray-700'
                                    : 'bg-white/90 hover:bg-white'
                            }`}>
                                <Camera className={`w-5 h-5 ${
                                    isDark
                                        ? 'text-green-400 group-hover:text-green-300'
                                        : 'text-green-700 group-hover:text-green-500'
                                }`} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleUpload(e, "cover")}
                                    className="hidden"
                                />
                            </label>
                            <div className="absolute -bottom-16 left-8">
                                <div className="relative w-32 h-32">
                                    <img
                                        src={avatar || "https://via.placeholder.com/150"}
                                        alt="Avatar"
                                        className={`w-32 h-32 rounded-full border-4 shadow-xl object-cover ${
                                            isDark ? 'border-gray-700' : 'border-white'
                                        }`}
                                    />
                                    <label className={`absolute bottom-0 right-0 p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform duration-300 ${
                                        isDark ? 'bg-gray-700' : 'bg-white'
                                    }`}>
                                        <Camera className={isDark ? 'w-4 h-4 text-green-400' : 'w-4 h-4 text-green-600'} />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleUpload(e, "avatar")}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="pt-20 px-8 sm:px-12 pb-12">
                            <div className={`border-b pb-6 mb-8 ${isDark ? 'border-gray-700' : 'border-green-100'}`}>
                                <h1 className={`text-4xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Bao Ngoc</h1>
                                <p className={isDark ? 'text-green-400 text-lg font-medium' : 'text-green-600 text-lg font-medium'}>@baongoc</p>
                                <div className="flex items-center mt-3">
                                    <span className={isDark ? 'mr-2 text-gray-300' : 'mr-2 text-gray-700'}>Channel:</span>
                                    <span className={`font-medium px-3 py-1 rounded-full text-sm ${
                                        isDark
                                            ? 'text-green-300 bg-green-900/50'
                                            : 'text-green-700 bg-green-50'
                                    }`}>
                                        TyTy's World
                                    </span>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mb-10">
                                <h2 className={`text-2xl font-semibold mb-3 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    <User className={isDark ? 'w-5 h-5 mr-2 text-green-400' : 'w-5 h-5 mr-2 text-green-600'} />
                                    Bio
                                </h2>
                                <div className={`rounded-xl p-5 ${
                                    isDark
                                        ? 'bg-gray-700/50 border-l-4 border-green-500'
                                        : 'bg-green-50 border-l-4 border-green-500'
                                }`}>
                                    <p className={isDark ? 'text-gray-300 text-base leading-relaxed' : 'text-gray-700 text-base leading-relaxed'}>
                                        Hi! I'm BaoNgoc, a content creator passionate about tech, travel, and lifestyle.
                                        Welcome to my channel!
                                    </p>
                                </div>
                            </div>

                            {/* Channel Info */}
                            <div className={`rounded-xl p-6 mb-10 shadow-sm ${
                                isDark
                                    ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
                                    : 'bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200'
                            }`}>
                                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-green-300' : 'text-green-800'}`}>Channel Details</h3>
                                <div className="grid sm:grid-cols-2 gap-y-3">
                                    <div className="flex items-center">
                                        <span className={`p-2 rounded-full shadow-sm mr-3 ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                                            <Mail className={isDark ? 'w-4 h-4 text-green-400' : 'w-4 h-4 text-green-600'} />
                                        </span>
                                        <div>
                                            <div className={isDark ? 'text-sm text-green-400 font-medium' : 'text-sm text-green-700 font-medium'}>Channel Name</div>
                                            <div className={isDark ? 'text-gray-300' : 'text-gray-800'}>TyTy's World</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className={`p-2 rounded-full shadow-sm mr-3 ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                                            <User className={isDark ? 'w-4 h-4 text-green-400' : 'w-4 h-4 text-green-600'} />
                                        </span>
                                        <div>
                                            <div className={isDark ? 'text-sm text-green-400 font-medium' : 'text-sm text-green-700 font-medium'}>Subscribers</div>
                                            <div className={isDark ? 'text-gray-300' : 'text-gray-800'}>1.2M</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Show More Section */}
                            {showMore && (
                                <div className={`rounded-xl p-6 mb-10 shadow-sm ${
                                    isDark
                                        ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600'
                                        : 'bg-gradient-to-br from-emerald-50 to-green-100 border border-green-200'
                                }`}>
                                    <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-green-300' : 'text-green-800'}`}>Personal Information</h3>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="flex items-center">
                                            <span className={`p-2 rounded-full shadow-sm mr-3 ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                                                <Mail className={isDark ? 'w-4 h-4 text-green-400' : 'w-4 h-4 text-green-600'} />
                                            </span>
                                            <div>
                                                <div className={isDark ? 'text-sm text-green-400 font-medium' : 'text-sm text-green-700 font-medium'}>Email</div>
                                                <div className={isDark ? 'text-gray-300' : 'text-gray-800'}>baongoc@example.com</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`p-2 rounded-full shadow-sm mr-3 ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                                                <Phone className={isDark ? 'w-4 h-4 text-green-400' : 'w-4 h-4 text-green-600'} />
                                            </span>
                                            <div>
                                                <div className={isDark ? 'text-sm text-green-400 font-medium' : 'text-sm text-green-700 font-medium'}>Phone Number</div>
                                                <div className={isDark ? 'text-gray-300' : 'text-gray-800'}>+1 (555) 123-4567</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`p-2 rounded-full shadow-sm mr-3 ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                                                <Calendar className={isDark ? 'w-4 h-4 text-green-400' : 'w-4 h-4 text-green-600'} />
                                            </span>
                                            <div>
                                                <div className={isDark ? 'text-sm text-green-400 font-medium' : 'text-sm text-green-700 font-medium'}>Date of Birth</div>
                                                <div className={isDark ? 'text-gray-300' : 'text-gray-800'}>January 1, 2004</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`p-2 rounded-full shadow-sm mr-3 ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                                                <MapPin className={isDark ? 'w-4 h-4 text-green-400' : 'w-4 h-4 text-green-600'} />
                                            </span>
                                            <div>
                                                <div className={isDark ? 'text-sm text-green-400 font-medium' : 'text-sm text-green-700 font-medium'}>Address</div>
                                                <div className={isDark ? 'text-gray-300' : 'text-gray-800'}>123 Binh Duong, Ho Chi Minh City</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Show More Button */}
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => setShowMore((prev) => !prev)}
                                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 font-medium"
                                >
                                    {showMore ? "Hide Details" : "Show More"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWithHeader>
    );
};

export default Profile;