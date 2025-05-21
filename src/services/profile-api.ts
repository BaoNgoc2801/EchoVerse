import axios from 'axios';
import { getAccessToken } from './auth-api';

interface UploadResponse {
    code: number;
    result: {
        url: string;
    };
}

/**
 * Upload user avatar
 * @param file - The avatar image file to upload
 * @returns Promise with the response containing the avatar URL
 */
export const uploadAvatar = async (file: File): Promise<UploadResponse> => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Authentication required');
        }

        const response = await axios.post(
            process.env.NEXT_PUBLIC_UPLOAD_AVATAR_API || '',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Upload avatar error:', error);
        throw error;
    }
};

/**
 * Upload user cover image
 * @param file - The cover image file to upload
 * @returns Promise with the response containing the cover image URL
 */
export const uploadCover = async (file: File): Promise<UploadResponse> => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Authentication required');
        }

        const response = await axios.post(
            process.env.NEXT_PUBLIC_UPLOAD_COVER_API || '',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Upload cover error:', error);
        throw error;
    }
};

// Example function to update user profile if needed
export const updateUserProfile = async (profileData: any) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error('Authentication required');
        }

        // Replace with your actual profile update endpoint
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/profile/user`,
            profileData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
};