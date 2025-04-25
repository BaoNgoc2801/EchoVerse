import axios from 'axios';

const LOGIN_API_URL = process.env.NEXT_PUBLIC_LOGIN_API_URL;
const REFRESH_TOKEN_API_URL = process.env.NEXT_PUBLIC_REFRESH_TOKEN_API_URL;

export const signIn = async (username: string, password: string) => {
    if (!LOGIN_API_URL) {
        throw new Error('Login API URL is not defined');
    }

    try {
        const response = await axios.post(LOGIN_API_URL, {
            username,
            password,
        });

        return response.data;
    } catch (error) {
        throw new Error('Incorrect username or password.');
    }
};

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
