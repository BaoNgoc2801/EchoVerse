'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Camera,
  Youtube,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchUserProfile, uploadAvatar } from '@/services/profile-api';
import Sidebar from "@/components/common/sidebar";

const AnimatedBorder = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-full shadow-lg"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 animate-pulse"></div>
      <div className="relative bg-black rounded-full p-1">{children}</div>
    </motion.div>
);

const ProfileInfo = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <motion.div
        className="flex items-start gap-4 bg-gradient-to-r from-[#0f0f0f] to-[#1b1b1b] p-5 rounded-xl shadow-xl hover:shadow-green-400/40 transition duration-300 border border-green-800/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
      <div className="text-green-400 mt-1">{icon}</div>
      <div>
        <p className="text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wide">{label}</p>
        <p className="text-base text-white font-light break-words leading-snug">{value}</p>
      </div>
    </motion.div>
);

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchUserProfile();
      setUser(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleUpload = async (file: File, type: 'avatar' | 'cover') => {
    if (!file || !user) return;
    await uploadAvatar(user.id, file);
    const updated = await fetchUserProfile();
    setUser(updated);
  };

  if (loading) return <p className="text-white text-center py-10">Loading...</p>;

  const profile = user.profile;
  const fullName = `${profile.firstName} ${profile.middleName || ''} ${profile.lastName}`.trim();

  return (
      <div className="h-screen flex bg-gradient-to-br from-black via-gray-900 to-green-950 text-white ">
        <div className="mr-6">
          <Sidebar />
        </div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full mt-4 rounded-3xl overflow-hidden shadow-[0_0_40px_#22c55e55] border border-green-600/20 bg-black/90 backdrop-blur-xl"
        >


          <div className="relative h-72">
            <img
                src={profile.coverImage}
                className="object-cover w-full h-full rounded-t-3xl"
                alt="Cover"
            />
            <button
                className="absolute top-4 right-4 p-2 bg-green-600 hover:bg-green-500 transition rounded-full shadow-md"
                onClick={() => coverRef.current?.click()}
            >
              <Camera className="text-white h-5 w-5" />
            </button>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={coverRef}
                onChange={(e) => handleUpload(e.target.files?.[0]!, 'cover')}
            />
            <div className="absolute -bottom-20 left-10">
              <AnimatedBorder>
                <div className="relative w-36 h-36 rounded-full overflow-hidden">
                  <img
                      src={profile.avatar}
                      alt="Avatar"
                      className="object-cover w-full h-full"
                  />
                </div>
              </AnimatedBorder>
              <div className="absolute -bottom-0.25 -right-0.25 z-10">
                <button
                    className="p-2 bg-white hover:bg-gray-200 rounded-full shadow border border-gray-300"
                    onClick={() => avatarRef.current?.click()}
                >
                  <Camera className="text-black h-4 w-4" />
                </button>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={avatarRef}
                    onChange={(e) => handleUpload(e.target.files?.[0]!, 'avatar')}
                />
              </div>
            </div>
          </div>

          <div className="pt-32 pb-14 px-6 md:px-14">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-2 tracking-tight leading-tight">
                {fullName}
              </h1>
              <p className="text-xl font-medium text-green-400 opacity-90">{profile.chanelName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProfileInfo icon={<User />} label="Full Name" value={fullName} />
              <ProfileInfo icon={<Mail />} label="Email" value={profile.email} />
              <ProfileInfo icon={<Phone />} label="Phone" value={profile.phoneNumber} />
              <ProfileInfo icon={<Youtube />} label="Channel" value={profile.chanelName} />
              <ProfileInfo icon={<User />} label="Bio" value={profile.bio} />
            </div>
          </div>
        </motion.div>
      </div>
  );
}
