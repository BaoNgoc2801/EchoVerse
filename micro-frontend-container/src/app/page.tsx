'use client';

import dynamic from 'next/dynamic';

const AuthPage = dynamic(() => import('auth/AuthPage'), { ssr: false });
const HomePage = dynamic(() => import('home/HomePage'), { ssr: false });

const AppContainer = () => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        return <AuthPage />;
    }

    return <HomePage />;
};

export default AppContainer;
