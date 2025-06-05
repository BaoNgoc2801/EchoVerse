"use client";

import {
    Grid3X3,
    User,
    Settings,
    Menu,
    MessageSquare,
    ArrowLeft,
    ImageIcon,
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
        { icon: ImageIcon, label: "Posts", path: "/post" }, // ✅ Mục mới
        { icon: User, label: "Profile", path: "/settings/profile" },
        { icon: MessageSquare, label: "Messages", path: "/chat" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    return (
        <div className="h-full sticky">
            <div
                className={`${
                    sidebarOpen ? "w-64" : "w-16"
                } h-full bg-gradient-to-b from-green-900 to-black border-r border-green-800 flex flex-col py-4 transition-all duration-300 ease-in-out`}
            >
                <div className={`${sidebarOpen ? "px-6" : "px-4"} space-y-2 flex-1`}>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-green-700 transition-colors mb-4"
                    >
                        {sidebarOpen ? <ArrowLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </button>

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
            </div>
        </div>
    );
};

export default Sidebar;
