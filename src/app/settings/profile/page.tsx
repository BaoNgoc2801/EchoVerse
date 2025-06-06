"use client";
import React, { useEffect, useRef, useState } from "react";
import { User, Mail, Phone, Camera, Youtube, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import {
  fetchUserProfile,
  uploadAvatar,
  uploadCoverImage,
  updateUserProfile,
} from "@/services/profile-api";

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

const EditableField = ({
                         icon,
                         label,
                         field,
                         value,
                         userId,
                         onUpdated,
                       }: {
  icon: React.ReactNode;
  label: string;
  field: string;
  value: string;
  userId: number;
  onUpdated: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || "");

  const save = async () => {
    try {
      await updateUserProfile(userId, { [field]: currentValue });
      onUpdated();
    } catch (err) {
      console.error("Update failed", err);
    }
    setEditing(false);
  };

  return (
      <motion.div
          className="flex items-start gap-4 bg-gradient-to-r from-[#0f0f0f] to-[#1b1b1b] p-5 rounded-xl shadow-xl hover:shadow-green-400/40 transition duration-300 border border-green-800/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
      >
        <div className="text-green-400 mt-1">{icon}</div>
        <div className="flex-1">
          <p className="text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wide">
            {label}
          </p>
          {editing ? (
              <input
                  type={field === "dob" ? "date" : "text"}
                  className="bg-transparent border border-green-500 text-white px-2 py-1 rounded w-full"
                  value={currentValue}
                  autoFocus
                  onChange={(e) => setCurrentValue(e.target.value)}
                  onBlur={save}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
              />
          ) : (
              <div className="flex items-center justify-between">
                <p className="text-base text-white font-light break-words leading-snug">
                  {currentValue}
                </p>
                <button onClick={() => setEditing(true)}>
                  <Pencil className="h-4 w-4 text-gray-400 hover:text-green-400" />
                </button>
              </div>
          )}
        </div>
      </motion.div>
  );
};

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const reload = async () => {
    const updated = await fetchUserProfile();
    setUser(updated);
  };

  useEffect(() => {
    reload().then(() => setLoading(false));
  }, []);

  const handleUpload = async (file: File) => {
    if (!file || !user) return;
    await uploadAvatar(user.id, file);
    reload();
  };

  const handleUploadCover = async (file: File) => {
    if (!file || !user) return;
    await uploadCoverImage(user.id, file);
    reload();
  };

  if (loading) return <p className="text-white text-center py-10">Loading...</p>;

  const profile = user.profile;
  const fullName = [profile.firstName, profile.middleName, profile.lastName]
      .filter(Boolean)
      .join(" ");

  return (
      <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-green-950 text-white">
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
                onChange={(e) => handleUploadCover(e.target.files?.[0]!)}
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
                    onChange={(e) => handleUpload(e.target.files?.[0]!)}
                />
              </div>
            </div>
          </div>

          <div className="pt-32 pb-14 px-6 md:px-14">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-2 tracking-tight leading-tight">
                {fullName}
              </h1>
              <p className="text-xl font-medium text-green-400 opacity-90">
                {profile.chanelName}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EditableField icon={<User />} label="First Name" field="firstName" value={profile.firstName} userId={user.id} onUpdated={reload} />
              <EditableField icon={<User />} label="Middle Name" field="middleName" value={profile.middleName || ""} userId={user.id} onUpdated={reload} />
              <EditableField icon={<User />} label="Last Name" field="lastName" value={profile.lastName || ""} userId={user.id} onUpdated={reload} />
              <EditableField icon={<Mail />} label="Email" field="email" value={profile.email} userId={user.id} onUpdated={reload} />
              <EditableField icon={<Phone />} label="Phone" field="phoneNumber" value={profile.phoneNumber} userId={user.id} onUpdated={reload} />
              <EditableField icon={<Youtube />} label="Channel" field="chanelName" value={profile.chanelName} userId={user.id} onUpdated={reload} />
              <EditableField icon={<User />} label="Bio" field="bio" value={profile.bio} userId={user.id} onUpdated={reload} />
              <EditableField icon={<User />} label="Date of Birth" field="dob" value={profile.dob ? profile.dob.split("T")[0] : ""} userId={user.id} onUpdated={reload} />
              <EditableField icon={<User />} label="Address" field="address" value={profile.address || ""} userId={user.id} onUpdated={reload} />

              <motion.div
                  className="flex items-start gap-4 bg-gradient-to-r from-[#0f0f0f] to-[#1b1b1b] p-5 rounded-xl shadow-xl border border-green-800/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
                <div className="text-green-400 mt-1"><User /></div>
                <div>
                  <p className="text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wide">
                    Subscribers
                  </p>
                  <p className="text-base text-white font-light break-words leading-snug">
                    {profile.subscribers ?? "0"}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
  );
}
