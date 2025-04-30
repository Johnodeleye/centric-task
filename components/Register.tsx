// components/RegisterForm.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Navbar } from "./NavBar";
import { ThemeToggle } from "./ThemeToogle";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Registration successful! You are now logged in.", {
        position: "top-center",
        duration: 3000
      });

      // Redirect to dashboard or home
      router.push("/feed");
    } catch (error: any) {
      toast.error(error.message || "Registration failed", {
        position: "top-center",
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-black/10 p-6 sm:p-8 rounded-xl shadow-lg border border-primary/10 dark:border-primary/20"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link href="/" className="mr-3">
                <ArrowLeft size={20} className="text-primary" />
              </Link>
              <h2 className="text-2xl font-bold text-primary">Create Account</h2>
            </div>
            <ThemeToggle />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-light mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm sm:text-base border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                required
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-light mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm sm:text-base border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-light mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm sm:text-base border border-primary/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent pr-10 transition-all"
                  required
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-white py-2.5 px-4 rounded-lg hover:bg-accent/90 transition-colors font-medium flex items-center justify-center disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : "Register"}
          </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-light">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-accent font-medium hover:underline transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}