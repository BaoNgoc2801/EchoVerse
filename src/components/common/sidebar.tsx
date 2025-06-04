"use client";

import {
    Grid3X3,
    User,
    Settings,
    Menu,
    X,
    MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const navigationItems = [
        { icon: Grid3X3, label: "Dashboard", path: "/" },
        { icon: User, label: "Profile", path: "/settings/profile" },
        { icon: MessageSquare, label: "Messages", path: "/chat" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    return (
        <>
            <div className="fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                    {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
            </div>

            <div
                className={`${
                    sidebarOpen ? "w-64" : "w-16"
                } bg-gradient-to-b from-green-900 to-black border-r border-green-800 flex flex-col py-4 transition-all duration-300 ease-in-out h-screen relative overflow-hidden`}
            >
                {/* Navigation Items */}
                <div className={`${sidebarOpen ? "px-6" : "px-4"} space-y-2 flex-1`}>
                    {navigationItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <div
                                key={index}
                                onClick={() => router.push(item.path)}
                                className={`flex items-center ${
                                    sidebarOpen ? "px-3" : "justify-center"
                                } py-3 rounded-lg cursor-pointer transition-colors ${
                                    isActive ? "bg-green-800" : "hover:bg-green-800"
                                }`}
                            >
                                <item.icon className="w-5 h-5 text-orange-400" />
                                {sidebarOpen && (
                                    <span className="ml-3 text-white">{item.label}</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Theme Toggle */}
                <div className={`${sidebarOpen ? "px-6" : "px-4"} mt-auto`}>
                    <div
                        className={`flex ${
                            sidebarOpen ? "justify-between" : "justify-center"
                        } items-center`}
                    >
                        {sidebarOpen ? (
                            <div className="flex bg-gray-800 rounded-lg p-1">
                                <button className="flex items-center px-3 py-2 rounded-md bg-orange-500 text-black text-sm font-medium">
                                    <span className="mr-2">🌙</span>
                                    Dark
                                </button>
                                <button className="flex items-center px-3 py-2 rounded-md text-gray-400 text-sm font-medium hover:text-white">
                                    <span className="mr-2">☀️</span>
                                    Light
                                </button>
                            </div>
                        ) : (
                            <button className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                <span>🌙</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
