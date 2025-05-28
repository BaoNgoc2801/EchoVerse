import axios from 'axios';

const REGISTER_API_URL = process.env.NEXT_PUBLIC_REGISTER_API_URL!;

export interface RegisterRequest {
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

export interface Role {
    name: string;
    description: string;
    permissions: any[];
}

export interface RegisterResponse {
    code: number;
    result: {
        id: number;
        username: string;
        roles: Role[];
    };
}

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(REGISTER_API_URL, data);
    console.log ("Response: ", response);
    return response.data;
};
