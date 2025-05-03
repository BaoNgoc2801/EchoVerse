"use client"
import React, { useState } from 'react';

const Profile = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="border border-green-400 rounded-xl overflow-hidden shadow-md bg-white">
                <div className="relative h-60 w-full bg-green-100">
                    <img
                        src="https://via.placeholder.com/1200x300"
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute -bottom-16 left-8">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Avatar"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                        />
                    </div>
                </div>

                <div className="pt-20 px-8 pb-10">
                    <div className="mb-6 border-b pb-4">
                        <h1 className="text-3xl font-bold text-green-700">Bao Ngoc</h1>
                        <p className="text-gray-500">@baongoc</p>
                        <p className="text-gray-600 mt-1">
                            Channel: <span className="font-medium text-black">TyTy’s World</span>
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-green-700">Bio</h2>
                        <p className="text-gray-800">
                            Hi! I'm BaoNgoc a content creator passionate about tech, travel, and lifestyle.
                            Welcome to my channel!
                        </p>
                    </div>

                    {/* Channel Info */}
                    <div className="border border-green-300 rounded-lg p-4 bg-green-50 mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-green-800">Channel Details</h3>
                        <div className="grid sm:grid-cols-2 gap-4 text-gray-800">
                            <div><strong>Channel Name:</strong> TyTy’s World</div>
                            <div><strong>Subscribers:</strong> 1.2M</div>
                        </div>
                    </div>

                    {/* Show More content first */}
                    {showMore && (
                        <div className="border border-green-300 rounded-lg p-4 bg-green-50 mb-6 animate-fade-in">
                            <h3 className="text-lg font-semibold mb-3 text-green-800">Personal Information</h3>
                            <div className="grid sm:grid-cols-2 gap-4 text-gray-800">
                                <div><strong>Email:</strong> baongoc@example.com</div>
                                <div><strong>Phone Number:</strong> +1 (555) 123-4567</div>
                                <div><strong>Date of Birth:</strong> January 1, 2004</div>
                                <div><strong>Address:</strong> 123 Binh Duong, Ho Chi Minh City</div>
                            </div>
                        </div>
                    )}

                    {/* Show More Button after content */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowMore((prev) => !prev)}
                            className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                        >
                            {showMore ? "Hide " : "Show More"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
