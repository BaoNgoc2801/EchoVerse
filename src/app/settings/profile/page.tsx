"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Youtube,
  Users,
  Camera,
} from "lucide-react";
import { motion } from "framer-motion";
import { fetchUserProfile, uploadAvatar } from "@/services/profile-api";

const AnimatedGradientBorder = ({ children, className = "" }) => (
  <motion.div
    className={`relative ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
    <div className="relative bg-white dark:bg-gray-900 rounded-full p-1">
      {children}
    </div>
  </motion.div>
);

const AnimatedText = ({ text, className = "" }) => {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </p>
  );
};

const ProfileInfoItem = ({ icon, label, value, delay = 0 }) => (
  <motion.div
    className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: delay * 0.1 }}
  >
    <div className="flex-shrink-0 mt-0.5 text-blue-600 dark:text-blue-400">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {label}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
        {value}
      </p>
    </div>
  </motion.div>
);

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (err) {
        setError(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleUpload = async (selectedFile) => {
    if (!selectedFile || !user) return alert("No file selected");
    try {
      await uploadAvatar(user.id, selectedFile);
      const updated = await fetchUserProfile();
      setUser(updated);
      alert("Uploaded successfully!");
    } catch (err) {
      alert(err.message || "Upload failed");
    }
  };

  const handleAvatarChange = async (e) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile); // optional, if you still want to keep it in state
      await handleUpload(selectedFile);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const profile = user.profile;
  const fullName = `${profile.firstName} ${profile.middleName || ""} ${
    profile.lastName
  }`.trim();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-48 -mb-12">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${profile.coverImage})` }}
            />
            <button
              onClick={() => avatarInputRef.current?.click()}
              className="absolute -right-2 -bottom-2 rounded-full bg-blue-600 p-2 text-white"
            >
              <Camera className="h-4 w-4" />
            </button>

            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <div className="absolute -bottom-12 left-6">
              <AnimatedGradientBorder className="rounded-full">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={profile.avatar}
                      alt={fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute -right-2 -bottom-2 rounded-full bg-blue-600 p-2 text-white"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </AnimatedGradientBorder>
            </div>
          </div>

          <div className="p-6 pt-16">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center md:col-span-1">
                <div className="text-center mt-10">
                  <h1 className="text-glow text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                    {fullName}
                  </h1>
                  <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                    {profile.chanelName}
                  </p>
                  <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      {profile.subscribers || 0} subscribers
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      About Me
                    </h2>
                    <AnimatedText
                      text={profile.bio}
                      className="text-gray-600 dark:text-gray-300"
                    />
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent my-6"></div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Contact Information
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <ProfileInfoItem
                        icon={<Mail className="h-5 w-5" />}
                        label="Email"
                        value={profile.email}
                        delay={1}
                      />
                      <ProfileInfoItem
                        icon={<Phone className="h-5 w-5" />}
                        label="Phone"
                        value={profile.phoneNumber}
                        delay={2}
                      />
                      <ProfileInfoItem
                        icon={<Calendar className="h-5 w-5" />}
                        label="Date of Birth"
                        value={profile.dob}
                        delay={3}
                      />
                      <ProfileInfoItem
                        icon={<MapPin className="h-5 w-5" />}
                        label="Address"
                        value={profile.address}
                        delay={4}
                      />
                      <ProfileInfoItem
                        icon={<User className="h-5 w-5" />}
                        label="Full Name"
                        value={fullName}
                        delay={5}
                      />
                      <ProfileInfoItem
                        icon={<Youtube className="h-5 w-5" />}
                        label="Channel"
                        value={profile.chanelName}
                        delay={6}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
