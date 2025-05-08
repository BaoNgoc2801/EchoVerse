import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

type ThemeContextType = {
    darkMode: boolean;
    toggleTheme: () => void;
};

// Create context with default values
export const ThemeContext = createContext<ThemeContextType>({
    darkMode: false,
    toggleTheme: () => {},
});

// Custom hook for easier access to theme context
export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Initialize state with preference check
    const [darkMode, setDarkMode] = useState(false);

    // Load theme preference on initial render
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');

            if (savedTheme) {
                setDarkMode(savedTheme === 'dark');
            } else {
                // Check system preference if no saved preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setDarkMode(prefersDark);
            }
        }
    }, []);

    // Apply theme classes whenever darkMode changes
    useEffect(() => {
        if (typeof document !== 'undefined') {
            if (darkMode) {
                document.documentElement.classList.add('dark');
                document.body.classList.add('bg-gray-900', 'text-white');
                document.body.classList.remove('bg-gray-50', 'text-gray-800');
            } else {
                document.documentElement.classList.remove('dark');
                document.body.classList.remove('bg-gray-900', 'text-white');
                document.body.classList.add('bg-gray-50', 'text-gray-800');
            }

            // Save preference
            localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};