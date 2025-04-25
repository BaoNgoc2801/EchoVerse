import axios from 'axios';

const REGISTER_API_URL = process.env.NEXT_PUBLIC_REGISTER_API_URL;

interface RegisterData {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    dob: string;
    address: string;
    bio: string;
    chanelName: string;
}

export const registerUser = async (data: RegisterData) => {
    if (!REGISTER_API_URL) {
        throw new Error('Register API URL is not defined');
    }

    try {
        const response = await axios.post(REGISTER_API_URL, {
            username: data.username,
            password: data.password,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName,
            phoneNumber: data.phoneNumber,
            dob: data.dob,
            address: data.address,
            bio: data.bio,
            chanelName: data.chanelName
        });

        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};
