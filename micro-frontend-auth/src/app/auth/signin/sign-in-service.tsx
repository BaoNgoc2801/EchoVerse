// sign-in-service.ts
import axios from 'axios';

// API URLs from environment variables
const LOGIN_API_URL = process.env.NEXT_PUBLIC_LOGIN_API_URL;
const REFRESH_TOKEN_API_URL = process.env.NEXT_PUBLIC_REFRESH_TOKEN_API_URL;

// API call to sign in with username and password
export const signIn = async (username: string, password: string) => {
    if (!LOGIN_API_URL) {
        throw new Error('Login API URL is not defined');
    }

    try {
        // Update request to use username and password instead of email
        const response = await axios.post(LOGIN_API_URL, {
            username,  // Sending username
            password,  // Sending password
        });

        // Assuming the API returns an object with access_token and refresh_token
        return response.data;
    } catch (error) {
        throw new Error('Incorrect username or password.');
    }
};

// API call to refresh token
export const refreshToken = async (refreshToken: string) => {
    if (!REFRESH_TOKEN_API_URL) {
        throw new Error('Refresh Token API URL is not defined');
    }

    try {
        const response = await axios.post(REFRESH_TOKEN_API_URL, {
            refresh_token: refreshToken,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to refresh token.');
    }
};
