'use client';

import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import Image from "next/image";
import { z } from 'zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn, refreshToken } from './sign-in-service';

const schema = z.object({
    username: z
        .string()
        .nonempty('Username is required'),
    password: z.string().nonempty('Password is required'),
});

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { username: '', password: '' },
        mode: 'onChange',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit: SubmitHandler<{ username: string; password: string }> = async (data) => {
        setLoading(true);
        try {
            const response = await signIn(data.username, data.password); // Use username and password
            if (response) {
                localStorage.setItem('username', data.username);
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                router.push('/dashboard');
            }
        } catch (error: any) {
            if (error.message === 'Incorrect username or password.') {
                setError('password', { type: 'manual', message: 'Incorrect username or password' });
                setError('username', { type: 'manual', message: 'Incorrect username or password' });
            }
            console.error("Login failed: ", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTokenRefresh = async () => {
        const storedRefreshToken = localStorage.getItem('refresh_token');
        if (storedRefreshToken) {
            try {
                const response = await refreshToken(storedRefreshToken);
                localStorage.setItem('access_token', response.access_token);
                console.log("Token refreshed:", response);
            } catch (error) {
                console.error("Failed to refresh token:", error);
            }
        }
    };

    return (
        <motion.div
            className="w-full h-screen flex items-center justify-center bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="w-full sm:w-3/4 md:w-1/2 h-auto bg-white text-black rounded-lg shadow-xl flex"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <div className="w-1/2 h-full bg-gray-100 flex flex-col items-center justify-center p-6 relative">
                    <Image
                        src="/image/logo.png"
                        alt="Auth Background"
                        layout="fill"
                        objectFit="cover"
                        className="absolute top-0 left-0"
                    />
                    <motion.div
                        key="welcome-signin"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative z-10 text-white drop-shadow-lg backdrop-blur-md p-4 rounded-lg text-center"
                    >
                        <h1 className="text-4xl font-extrabold">Welcome Back!</h1>
                        <p className="mt-2 text-lg font-medium">
                            Sign in to continue your journey.
                        </p>
                    </motion.div>
                </div>

                {/* Right side: Sign In form */}
                <motion.div
                    className="w-1/2 h-full p-6 bg-white flex flex-col justify-center"
                >
                    <button
                        className="absolute top-3 right-3 text-gray-600 hover:text-black"
                        onClick={() => console.log('Close the modal')}
                    >
                        ✖
                    </button>

                    <motion.div key="sign-in">
                        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
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
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register('password')}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {errors.password &&
                                    <p className="text-red-500 text-xs">{errors.password.message}</p>}
                            </div>

                            <div className="text-right">
                                <button className="text-purple-500 hover:underline">Forgot password?</button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        {/* Link to Sign Up */}
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-500">
                                Don't have an account?{' '}
                                <button
                                    onClick={() => console.log("Redirect to sign up page or open modal")}
                                    className="text-purple-600 hover:text-purple-800"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </motion.div>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300"/>
                        <span className="mx-2 text-gray-500">OR</span>
                        <hr className="flex-grow border-gray-300"/>
                    </div>
                    <button
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 text-black p-3 rounded-lg hover:bg-gray-100">
                        <FcGoogle size={24}/> Sign in with Google
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default LoginPage;
