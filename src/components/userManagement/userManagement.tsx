"use client"

import React, { useState } from "react";

const UserManagement: React.FC = () => {
    const [userName, setUserName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Welcome, ${userName}`);
    };

    return (
        <div className="p-4 bg-gray-800 text-white w-full max-w-md mx-auto mt-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    className="p-2 rounded bg-gray-600 text-white"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-600 px-4 py-2 rounded"
                >
                    Start
                </button>
            </form>
        </div>
    );
};

export default UserManagement;
