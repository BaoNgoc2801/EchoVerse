'use client';

import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

import { useState } from "react";

interface AuthModalProps {
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    // Toggle form mode between SignUp and SignIn
    const handleToggle = () => {
        setTimeout(() => {
            setIsSignUp((prev) => !prev);
        }, 400);
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
                className="relative w-full max-w-3xl h-[550px] bg-white text-black rounded-lg shadow-xl overflow-hidden flex"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-full flex">
                    <motion.div
                        className="absolute w-1/2 h-full p-6 bg-white flex flex-col justify-center"
                        animate={{ left: isSignUp ? "0%" : "50%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-black"
                            onClick={onClose}
                        >
                            ✖
                        </button>

                        <motion.div key={isSignUp ? "sign-up" : "sign-in"}>
                            <h2 className="text-2xl font-bold text-center mb-4">
                                {isSignUp ? "Sign Up" : "Sign In"}
                            </h2>
                            <form className="space-y-4">
                                {isSignUp && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                {!isSignUp && (
                                    <div className="text-right">
                                        <button className="text-purple-500 hover:underline">
                                            Forgot password?
                                        </button>
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg"
                                >
                                    {isSignUp ? "Sign Up" : "Sign In"}
                                </button>
                            </form>
                        </motion.div>
                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-2 text-gray-500">OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-black p-3 rounded-lg hover:bg-gray-100">
                            <FcGoogle size={24} /> {isSignUp ? "Sign up" : "Sign in"} with Google
                        </button>
                        <div className="text-center mt-4 text-gray-600">
                            {isSignUp ? (
                                <>
                                    Already have an account?{" "}
                                    <button className="text-purple-500 hover:underline" onClick={handleToggle}>
                                        Sign in
                                    </button>
                                </>
                            ) : (
                                <>
                                    Don’t have an account?{" "}
                                    <button className="text-purple-500 hover:underline" onClick={handleToggle}>
                                        Sign up
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Welcome Section */}
                    <motion.div
                        className="absolute w-1/2 h-full bg-gray-100 flex flex-col items-center justify-center text-center p-6 relative"
                        animate={{ left: isSignUp ? "50%" : "0%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        {/* Sử dụng Next.js Image component */}
                        <Image
                            src="/image/logo.png" // Sử dụng đường dẫn tương đối bắt đầu từ thư mục public
                            alt="Auth Background"
                            layout="fill"
                            objectFit="cover"
                            className="absolute top-0 left-0"
                        />
                        <motion.div
                            key={isSignUp ? "welcome-signup" : "welcome-signin"}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="relative z-10 text-white drop-shadow-lg backdrop-blur-md p-4 rounded-lg"
                        >
                            <h1 className="text-4xl font-extrabold">
                                {isSignUp ? "Welcome!" : "Welcome Back!"}
                            </h1>
                            <p className="mt-2 text-lg font-medium">
                                {isSignUp
                                    ? "Join us and explore amazing features."
                                    : "Sign in to continue your journey."}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AuthModal;
