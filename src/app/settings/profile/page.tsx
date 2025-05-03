"use client"
import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const Profile = () => {
    const [showMore, setShowMore] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [cover, setCover] = useState<string | null>(null);

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        setImage: (url: string) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setImage(reader.result.toString());
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="border border-gray-300 rounded-xl overflow-hidden shadow-md bg-white">
                {/* Cover Image */}
                <div className="relative h-60 w-full bg-gray-100">
                    <img
                        src={cover || "https://via.placeholder.com/1200x300"}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                    <label className="absolute top-3 right-4 bg-white bg-opacity-80 p-2 rounded-full shadow cursor-pointer hover:bg-opacity-100 transition">
                        <Camera className="w-5 h-5 text-gray-700" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setCover)}
                            className="hidden"
                        />
                    </label>
                    <div className="absolute -bottom-16 left-8">
                        <div className="relative w-32 h-32">
                            <img
                                src={avatar || "https://via.placeholder.com/150"}
                                alt="Avatar"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                            />
                            <label className="absolute bottom-0 right-0 bg-white bg-opacity-90 p-1.5 rounded-full cursor-pointer hover:bg-opacity-100 transition">
                                <Camera className="w-4 h-4 text-gray-700" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setAvatar)}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="pt-20 px-8 pb-10 text-gray-800">
                    <div className="mb-6 border-b border-gray-200 pb-4">
                        <h1 className="text-3xl font-bold text-gray-900">Bao Ngoc</h1>
                        <p className="text-gray-500">@baongoc</p>
                        <p className="text-gray-600 mt-1">
                            Channel: <span className="font-medium text-gray-900">TyTy’s World</span>
                        </p>
                    </div>

                    {/* Bio */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Bio</h2>
                        <p>
                            Hi! I'm BaoNgoc, a content creator passionate about tech, travel, and lifestyle.
                            Welcome to my channel!
                        </p>
                    </div>

                    {/* Channel Info */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Channel Details</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div><strong>Channel Name:</strong> TyTy’s World</div>
                            <div><strong>Subscribers:</strong> 1.2M</div>
                        </div>
                    </div>

                    {/* Show More Section */}
                    {showMore && (
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-6">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Personal Information</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div><strong>Email:</strong> baongoc@example.com</div>
                                <div><strong>Phone Number:</strong> +1 (555) 123-4567</div>
                                <div><strong>Date of Birth:</strong> January 1, 2004</div>
                                <div><strong>Address:</strong> 123 Binh Duong, Ho Chi Minh City</div>
                            </div>
                        </div>
                    )}

                    {/* Show More Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowMore((prev) => !prev)}
                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow hover:from-green-600 hover:to-green-800 transition"
                        >
                            {showMore ? "Hide" : "Show More"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
