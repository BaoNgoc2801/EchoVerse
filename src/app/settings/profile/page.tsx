// src/app/settings/profile/page.tsx
import React from 'react';

const Profile = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
            <div className="bg-gray-800 text-white p-6 rounded-lg">
                <h2 className="text-2xl font-semibold">User Details</h2>
                <div className="my-4">
                    <strong>Name:</strong> John Doe
                </div>
                <div className="my-4">
                    <strong>Email:</strong> johndoe@example.com
                </div>
                {/* More profile details */}
            </div>
        </div>
    );
};

export default Profile;
