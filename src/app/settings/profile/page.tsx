
 "use client";
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import LayoutWithHeader from "../../../components/layout/layout-with-header";
 import {uploadImage} from "@/services/profile-api";

 const Profile = () => {
     const [showMore, setShowMore] = useState(false);
     const [avatar, setAvatar] = useState<string | null>(null);
     const [cover, setCover] = useState<string | null>(null);
     const userId = "123"; // Replace with dynamic userId

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
    return (
        <LayoutWithHeader>
            <div className="w-full min-h-screen">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-12">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        {/* Cover */}
                        <div className="relative h-64 w-full">
                            <img
                                src={cover || "https://via.placeholder.com/1200x300"}
                                alt="Cover"
                                className="w-full h-full object-cover"
                            />
                            <label className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-full shadow-md cursor-pointer hover:bg-opacity-100 transition">
                                <Camera className="w-5 h-5 text-gray-700" />
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
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                                    />
                                    <label className="absolute bottom-0 right-0 bg-white bg-opacity-90 p-1.5 rounded-full cursor-pointer hover:bg-opacity-100 transition">
                                        <Camera className="w-4 h-4 text-gray-700" />
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
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <h1 className="text-4xl font-bold text-gray-900">Bao Ngoc</h1>
                                <p className="text-gray-500 text-lg">@baongoc</p>
                                <p className="text-gray-700 mt-2">
                                    Channel: <span className="font-medium text-gray-900">TyTy’s World</span>
                                </p>
                            </div>

                            {/* Bio */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Bio</h2>
                                <p className="text-gray-700 text-base leading-relaxed">
                                    Hi! I'm BaoNgoc, a content creator passionate about tech, travel, and lifestyle.
                                    Welcome to my channel!
                                </p>
                            </div>

                            {/* Channel Info */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Channel Details</h3>
                                <div className="grid sm:grid-cols-2 gap-y-3 text-gray-800">
                                    <div><strong>Channel Name:</strong> TyTy’s World</div>
                                    <div><strong>Subscribers:</strong> 1.2M</div>
                                </div>
                            </div>

                            {/* Show More Section */}
                            {showMore && (
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                                    <div className="grid sm:grid-cols-2 gap-y-3 text-gray-800">
                                        <div><strong>Email:</strong> baongoc@example.com</div>
                                        <div><strong>Phone Number:</strong> +1 (555) 123-4567</div>
                                        <div><strong>Date of Birth:</strong> January 1, 2004</div>
                                        <div><strong>Address:</strong> 123 Binh Duong, Ho Chi Minh City</div>
                                    </div>
                                </div>
                            )}

                            {/* Show More Button */}
                            <div className="text-center">
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
            </div>
        </LayoutWithHeader>
    );
};

export default Profile;
