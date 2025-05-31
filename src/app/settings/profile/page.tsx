"use client";

import React, { useEffect, useState } from "react";
import { fetchUserProfile, uploadAvatar } from "@/services/profile-api";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await fetchUserProfile(); // Không cần truyền token nữa
        setUser(profile);
      } catch (err: any) {
        setError(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleUpload = async () => {
    if (!file || !user) return alert("No file selected");
    try {
      const result = await uploadAvatar(user.id, file);
      alert("Uploaded successfully!");

      const updated = await fetchUserProfile();
      setUser(updated);
    } catch (err: any) {
      alert(err.message || "Upload failed");
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const { username, profile } = user;
  const { avatar, firstName, lastName, email } = profile;

  return (
    <div className="max-w-xl mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

      <p>
        <strong>Username:</strong> {username}
      </p>
      <p>
        <strong>Name:</strong> {lastName} {firstName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>

      <div className="mt-6">
        <p className="mb-2 font-semibold">Avatar:</p>
        <img
          src={avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="mt-4 flex gap-2 items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm"
          />
          <button
            onClick={handleUpload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Upload Avatar
          </button>
        </div>
      </div>
    </div>
  );
}
