'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema validation
const schema = z.object({
    username: z.string().nonempty('Username is required'),
    password: z.string().nonempty('Password is required'),
});

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { username: '', password: '' },
        mode: 'onChange',
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const onSubmit: SubmitHandler<{ username: string; password: string }> = async (data) => {
        // Placeholder for login logic (can be replaced with actual logic later)
        setLoading(true);
        try {
            // Simulating successful login (replace with actual logic)
            localStorage.setItem('username', data.username);
            router.push('/home');  // Redirect to home page after login
        } catch (error: any) {
            // Handle login failure (for example, incorrect credentials)
            setError('password', { type: 'manual', message: 'Incorrect username or password' });
            setError('username', { type: 'manual', message: 'Incorrect username or password' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-[#1a1a1a]">
            <div className="w-full sm:w-1/2 md:w-1/3 bg-[#2c2c2c] p-8 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mt-4 text-white">Sign in to EchoVerse</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="mb-3">
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
                        <label className="block text-sm font-semibold text-gray-300 mb-2">PASSWORD</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                {...register('password')}
                                className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                            />
                            <span
                                className="absolute right-4 top-[14px] cursor-pointer text-gray-400"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaRegEyeSlash size={20}/> : <FaRegEye size={20}/>}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    <div className="text-right">
                        <button
                            className="text-green-500 hover:underline text-sm"
                            onClick={() => router.push('/forgot-password')}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#00c079] hover:bg-green-800 text-white font-bold p-3 rounded-full"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{' '}
                        <button
                            onClick={() => router.push('/auth/signup')}
                            className="text-green-500 hover:text-green-700"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
