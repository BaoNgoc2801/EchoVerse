'use client';

import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`bg-gray-800 mt-3 text-white w-64 min-h-screen p-5 transition-transform ${isOpen ? 'transform-none' : 'transform -translate-x-full'}`}>
            <button onClick={toggleSidebar} className="text-white p-2 focus:outline-none md:hidden">
                <i className="fas fa-bars"></i> {/* Hamburger icon */}
            </button>
            <div className="mt-5 space-y-4">
                <Link href="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-700 rounded">Dashboard</Link>
                <Link href="/admin/users" className="block px-4 py-2 hover:bg-gray-700 rounded">Manage Users</Link>
                <Link href="/admin/settings" className="block px-4 py-2 hover:bg-gray-700 rounded">Settings</Link>
                <Link href="/admin/reports" className="block px-4 py-2 hover:bg-gray-700 rounded">Reports</Link>
            </div>
        </div>
    );
};

export default Sidebar;
