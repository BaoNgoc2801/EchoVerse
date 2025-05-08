import { FC } from "react";
import { useTheme } from "@/contexts/themeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: FC = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-300 ${
                darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-300"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

export default ThemeToggle;