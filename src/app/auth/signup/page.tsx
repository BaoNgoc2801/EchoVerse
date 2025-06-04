"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/services/signup-api";
import { useRouter } from "next/navigation";

const schema = z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
    email: z.string().email("Please enter a valid email"),
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    middleName: z.string().nonempty("Middle Name is required"),
    phoneNumber: z.string().nonempty("Phone number is required"),
    dob: z.string().nonempty("Date of birth is required"),
    address: z.string().nonempty("Address is required"),
    bio: z.string().nonempty("Bio is required"),
    chanelName: z.string().nonempty("Channel Name is required"),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),
});

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
            middleName: "",
            phoneNumber: "",
            dob: "",
            address: "",
            bio: "",
            chanelName: "",
            acceptTerms: false,
        },
        mode: "onChange",
    });

    const handleSubmitForm = handleSubmit(async (data) => {
        setLoading(true);
        try {
            const { acceptTerms, ...formData } = data;
            await registerUser(formData);
            alert("Registration successful!");
            router.push("/auth/signin");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] overflow-auto py-3 px-2">
            <div className="w-full sm:w-3/6 md:w-3/6 bg-[#2c2c2c] p-8 rounded-lg shadow-lg mt-10">
                <div className="text-center mb-6 mt-5">
                    <h2 className="text-3xl font-bold mt-4 text-white">Sign Up</h2>
                </div>

                <form onSubmit={handleSubmitForm} className="space-y-4">
                    {[
                        { label: "USERNAME", name: "username", type: "text" },
                        { label: "FULL NAME", name: "firstName", type: "text" },
                        { label: "LAST NAME", name: "lastName", type: "text" },
                        { label: "MIDDLE NAME", name: "middleName", type: "text" },
                        { label: "EMAIL", name: "email", type: "email" },
                        { label: "PHONE NUMBER", name: "phoneNumber", type: "text" },
                        { label: "DATE OF BIRTH", name: "dob", type: "date" },
                        { label: "ADDRESS", name: "address", type: "text" },
                        { label: "CHANNEL NAME", name: "chanelName", type: "text" },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
                            <input
                                type={type}
                                placeholder={`Enter your ${label.toLowerCase()}`}
                                {...register(name as keyof FormData)}
                                className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b3b] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors[name as keyof FormData] && (
                                <p className="text-red-500 text-xs">
                                    {errors[name as keyof FormData]?.message?.toString()}
                                </p>
                            )}
                        </div>
                    ))}

                    {/* Password field with eye icon */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">PASSWORD</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password")}
                                className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b3b] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs">{errors.password.message?.toString()}</p>
                        )}
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">BIO</label>
                        <textarea
                            placeholder="Tell us a bit about yourself"
                            {...register("bio")}
                            className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b3b] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.bio && <p className="text-red-500 text-xs">{errors.bio.message}</p>}
                    </div>

                    {/* Terms */}
                    <div className="flex items-center">
                        <input type="checkbox" {...register("acceptTerms")} className="mr-2" />
                        <label className="text-sm text-gray-500">
                            By signing up, I agree to the{" "}
                            <span className="text-green-500">User Agreements</span>,{" "}
                            <span className="text-green-500">Privacy Policy</span>,{" "}
                            <span className="text-green-500">Cookie Policy</span>, and{" "}
                            <span className="text-green-500">E-Sign Consent</span>
                        </label>
                    </div>
                    {errors.acceptTerms && (
                        <p className="text-red-500 text-xs">{errors.acceptTerms.message}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#00c079] hover:bg-green-800 text-white font-bold p-3 rounded-full"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/auth/signin")}
                            className="text-green-500 hover:text-green-700"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
