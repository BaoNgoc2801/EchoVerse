"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "@/services/signin-api";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await signIn(username, password);
      if (response && response.username) {
        localStorage.setItem("username", response.username);

        if (username === "admin" && password === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex h-screen items-center justify-center bg-[#1a1a1a]">
        <div className="w-full sm:w-1/2 md:w-1/3 bg-[#2c2c2c] p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Username
              </label>
              <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                  placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pr-10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#3b3b3b] text-white"
                    placeholder="Enter your password"
                />
                <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                  type="button"
                  onClick={() => router.push("/auth/forgot-password")}
                  className="text-sm text-green-500 hover:text-green-700"
              >
                Forgot password?
              </button>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={() => router.push("/auth/signup")}
                    className="text-green-500 hover:text-green-700"
                >
                  Sign up
                </button>
              </p>
            </div>

            <button
                type="submit"
                className="w-full bg-[#00c079] hover:bg-green-800 text-white font-bold p-3 rounded-full"
                disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default SignInPage;
