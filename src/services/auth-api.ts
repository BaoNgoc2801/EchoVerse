import axios from 'axios';

interface RegisterParams {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber?: string;
    dob?: string;
    address?: string;
    bio?: string;
    chanelName?: string;
}

interface RegisterResponse {
    code: number;
    result: {
        id: number;
        username: string;
        roles: {
            name: string;
            description: string;
            permissions: any[];
        }[];
    };
}

interface LoginParams {
    username: string;
    password: string;
}

interface LoginResponse {
    code: number;
    result: {
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: number;
    };
}

interface RefreshTokenParams {
    refreshToken: string;
}

export const registerUser = async (params: RegisterParams): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_REGISTER_API_URL || '',
            params
        );

        // Log the full response for debugging
        console.log('Register API Response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

export const loginUser = async (params: LoginParams): Promise<LoginResponse> => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_LOGIN_API_URL || '',
            params
        );

        // Log the full response for debugging
        console.log('Login API Response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const refreshToken = async (params: RefreshTokenParams) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_REFRESH_TOKEN_API_URL || '',
            params
        );

        // Log the full response for debugging
        console.log('Refresh Token API Response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Refresh token error:', error);
        throw error;
    }
};

// Helper function to set auth tokens in local storage
export const setAuthTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // Log stored tokens for debugging
    console.log('Tokens stored in localStorage:', { accessToken, refreshToken });
};

// Helper function to get the current access token
export const getAccessToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
};

// Helper function to get the current refresh token
export const getRefreshToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('refreshToken');
    }
    return null;
};

// Helper function to clear auth tokens on logout
export const clearAuthTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('Auth tokens cleared from localStorage');
};