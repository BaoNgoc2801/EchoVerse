"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode((prev) => !prev);

    return (
        <div className="fixed top-6 right-6 z-50">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white shadow-lg flex items-center justify-center"
                aria-label="Toggle theme"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
    );
};

export default ThemeToggle;
