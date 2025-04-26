// src/services/signin-api.ts

import axios from 'axios';
import { useRouter } from 'next/navigation';  // To navigate after login

const LOGIN_API_URL = process.env.NEXT_PUBLIC_LOGIN_API_URL;

export const signIn = async (username: string, password: string) => {
    if (!LOGIN_API_URL) {
        console.error('Login API URL is not defined');
        throw new Error('Login API URL is not defined');
    }

    try {
        const response = await axios.post(LOGIN_API_URL, { username, password });

        if (response.data && response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);

            const router = useRouter();
            router.push('/home');

            return response.data;
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        console.error('Login failed: ', error);
        throw new Error('Incorrect username or password.');
    }
};
