'use client';

import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { registerUser } from './sign-up-service'; // Import the registerUser function

// Define the schema using zod
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
    chanelName: z.string().nonempty('Channel Name is required')
});

const RegisterPage = ({ onClose }: { onClose: () => void }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
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
            chanelName: ''
        },
        mode: 'onChange',
    });
    const [loading, setLoading] = useState(false);

    // Submit handler
    const onSubmit: SubmitHandler<any> = async (data) => {
        setLoading(true);
        try {
            const response = await registerUser(data); // Send data to register
            if (response && response.code === 0) {
                alert('Registration successful!');
                onClose();  // Close the modal on success
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-3xl h-auto bg-white text-black rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-full flex">
                    {/* Left side: Sign Up form */}
                    <motion.div
                        className="w-full sm:w-1/2 p-6 bg-white flex flex-col justify-center overflow-y-auto"
                        animate={{ left: "0%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-black"
                            onClick={onClose}
                        >
                            ✖
                        </button>

                        <motion.div key="sign-up">
                            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        {...register('username')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.username &&
                                        <p className="text-red-500 text-xs">{errors.username.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        {...register('firstName')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.firstName &&
                                        <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        {...register('lastName')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.lastName &&
                                        <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Middle Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your middle name"
                                        {...register('middleName')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.middleName &&
                                        <p className="text-red-500 text-xs">{errors.middleName.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register('email')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.email &&
                                        <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register('password')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.password &&
                                        <p className="text-red-500 text-xs">{errors.password.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        {...register('phoneNumber')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.phoneNumber &&
                                        <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        {...register('dob')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.dob &&
                                        <p className="text-red-500 text-xs">{errors.dob.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your address"
                                        {...register('address')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.address &&
                                        <p className="text-red-500 text-xs">{errors.address.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Bio
                                    </label>
                                    <textarea
                                        placeholder="Tell us a bit about yourself"
                                        {...register('bio')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.bio &&
                                        <p className="text-red-500 text-xs">{errors.bio.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Channel Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your channel name"
                                        {...register('chanelName')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.chanelName &&
                                        <p className="text-red-500 text-xs">{errors.chanelName.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg"
                                >
                                    {loading ? "Registering..." : "Sign Up"}
                                </button>
                            </form>
                        </motion.div>

                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-2 text-gray-500">OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-black p-3 rounded-lg hover:bg-gray-100">
                            <FcGoogle size={24} /> Sign up with Google
                        </button>
                    </motion.div>

                    {/* Right side: Welcome section */}
                    <motion.div
                        className="absolute w-1/2 h-full bg-gray-100 flex flex-col items-center justify-center text-center p-6 relative"
                        animate={{ left: "50%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <Image
                            src="/image/logo.png"
                            alt="Auth Background"
                            layout="fill"
                            objectFit="cover"
                            className="absolute top-0 left-0"
                        />
                        <motion.div
                            key="welcome-signup"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="relative z-10 text-white drop-shadow-lg backdrop-blur-md p-4 rounded-lg"
                        >
                            <h1 className="text-4xl font-extrabold">Welcome!</h1>
                            <p className="mt-2 text-lg font-medium">
                                Join us and explore amazing features.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default RegisterPage;
