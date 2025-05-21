'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LayoutWithHeader from "@/components/layout/layout-with-header";
import { registerUser } from "@/services/auth-api";

const schema = z.object({
    username: z.string().nonempty('Username is required'),
    password: z.string().nonempty('Password is required'),
    email: z.string().email('Please enter a valid email'),
    firstName: z.string().nonempty('First Name is required'),
    lastName: z.string().nonempty('Last Name is required'),
    middleName: z.string().nonempty('Middle Name is required'),
    phoneNumber: z.string().nonempty('Phone number is required'),
    dob: z.string().nonempty('Date of birth is required'),
    address: z.string().nonempty('Address is required'),
    bio: z.string().nonempty('Bio is required'),
    chanelName: z.string().nonempty('Channel Name is required'),
    acceptTerms: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions",
    }),
});

type RegisterFormInputs = z.infer<typeof schema>;

const RegisterPage = ({ onClose }: { onClose?: () => void }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            middleName: '',
            phoneNumber: '',
            dob: '',
            address: '',
            bio: '',
            chanelName: '',
            acceptTerms: false
        },
        mode: 'onChange',
    });
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const router = useRouter();

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        setLoading(true);
        setApiError('');

        try {
            // Call the registration API
            const response = await registerUser({
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

            console.log('Registration successful:', response);

            // Show success message
            alert('Registration successful! Please sign in.');

            // Redirect to login page or close modal
            if (onClose) {
                onClose();
            } else {
                router.push('/auth/signin');
            }
        } catch (error: any) {
            console.error('Registration failed:', error);
            setApiError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LayoutWithHeader>
            <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] overflow-auto py-3 px-2">
                <div className="w-full sm:w-3/6 md:w-3/6 bg-[#2c2c2c] p-8 rounded-lg shadow-lg mt-10">
                    <div className="text-center mb-6 mt-5">
                        <h2 className="text-3xl font-bold mt-4 text-white">Sign Up</h2>
                    </div>

                    {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}

                    {/* Form for registration */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">USERNAME</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                {...register('username')}
                                className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                            />
                            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">FULL NAME</label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                {...register('firstName')}
                                className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                            />
                            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                        </div>

                        <div className="flex items-center justify-between space-x-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-semibold text-gray-300 mb-2">LAST NAME</label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    {...register('lastName')}
                                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                                />
                                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                            </div>

                            <div className="w-1/2">
                                <label className="block text-sm font-semibold text-gray-300 mb-2">MIDDLE NAME</label>
                                <input
                                    type="text"
                                    placeholder="Enter your middle name"
                                    {...register('middleName')}
                                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                                />
                                {errors.middleName && <p className="text-red-500 text-xs">{errors.middleName.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">EMAIL</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register('email')}
                                className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">PASSWORD</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                {...register('password')}
                                className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between space-x-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-semibold text-gray-300 mb-2">PHONE NUMBER</label>
                                <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    {...register('phoneNumber')}
                                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
                            </div>

                            <div className="w-1/2">
                                <label className="block text-sm font-semibold text-gray-300 mb-2">DATE OF BIRTH</label>
                                <input
                                    type="date"
                                    {...register('dob')}
                                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                                />
                                {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">ADDRESS</label>
                            <input
                                type="text"
                                placeholder="Enter your address"
                                {...register('address')}
                                className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                            />
                            {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">BIO</label>
                            <textarea
                                placeholder="Tell us a bit about yourself"
                                {...register('bio')}
                                className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                            />
                            {errors.bio && <p className="text-red-500 text-xs">{errors.bio.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">CHANNEL NAME</label>
                            <input
                                type="text"
                                placeholder="Enter your channel name"
                                {...register('chanelName')}
                                className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                            />
                            {errors.chanelName && <p className="text-red-500 text-xs">{errors.chanelName.message}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                {...register('acceptTerms')}
                                className="mr-2"
                            />
                            <label className="text-sm text-gray-500">
                                By signing up, I agree to the <span className="text-green-500">User Agreements</span>, <span className="text-green-500">Privacy Policy</span>, <span className="text-green-500">Cookie Policy</span>, and <span className="text-green-500">E-Sign Consent</span>
                            </label>
                        </div>
                        {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms.message}</p>}

                        <button
                            type="submit"
                            className="w-full bg-[#00c079] hover:bg-green-800 text-white font-bold p-3 rounded-full"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    {/* Already have an account */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <button
                                onClick={() => router.push('/auth/signin')}
                                className="text-green-500 hover:text-green-700"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </LayoutWithHeader>
    );
};

export default RegisterPage;