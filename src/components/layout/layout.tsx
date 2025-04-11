// src/components/layout/Layout.tsx
import React from 'react';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="p-4 bg-gray-800">
                <h1 className="text-2xl font-bold">Livestream Platform</h1>
            </header>
            <main>{children}</main>
            <footer className="p-4 bg-gray-800 text-center">
                &copy; 2023 Livestream Platform. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
