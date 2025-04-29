// components/LoginForm.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Navbar } from "./NavBar";
import { ThemeToggle } from "./ThemeToogle";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-primary/10">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 dark:bg-primary/10">
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
              <h2 className="text-2xl font-bold text-primary">Welcome Back</h2>
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
                placeholder="Enter your username"
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
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-accent focus:ring-accent border-primary/20 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-light">
                  Remember me
                </label>
              </div>

              <Link 
                href="#" 
                className="text-sm text-accent hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-white py-2.5 px-4 rounded-lg hover:bg-accent/90 transition-colors font-medium flex items-center justify-center"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-light">
              Don't have an account?{" "}
              <Link 
                href="/register" 
                className="text-accent font-medium hover:underline transition-colors"
              >
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}