"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToogle";
import { LogIn, UserPlus } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between p-4 max-w-7xl mx-auto w-full"
    >
      <div className="flex-1">
        <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
          Centric<span className="text-accent">Task</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        <Link 
          href="/login" 
          className="hover:text-accent transition-colors flex items-center gap-1"
        >
          <span className="hidden md:inline">Login</span>
          <LogIn size={18} className="md:hidden" />
        </Link>
        <Link 
          href="/register" 
          className="bg-accent text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-1 text-sm md:text-base"
        >
          <span className="hidden md:inline">Get Started</span>
          <UserPlus size={18} className="md:hidden" />
        </Link>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}