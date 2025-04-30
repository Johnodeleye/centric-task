"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToogle";
import { LogIn, UserPlus, LogOut, Home, LayoutDashboard, PlusSquare, ScrollText, User as UserIcon } from "lucide-react";
import toast from "react-hot-toast";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    avatar?: string;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Check auth status and get user data
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    setIsAuthenticated(!!token);
    
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserData({
          username: parsedUser.username,
          email: parsedUser.email,
          avatar: parsedUser.avatar
        });
      } catch (err) {
        console.error('Error parsing user data', err);
      }
    }

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserData(null);
    toast.success('Logged out successfully');
    router.push('/');
    setShowDropdown(false);
  };

  // Helper function to determine active link
  const isActive = (path: string) => pathname === path;

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between p-4 max-w-7xl mx-auto w-full sticky top-0 z-50 ${
        isScrolled ? 'backdrop-blur-md bg-background/80 border-b' : 'bg-background'
      }`}
    >
      <div className="flex-1">
        <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
          Centric<span className="text-accent">Task</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        {isAuthenticated ? (
          <>
            <Link 
              href="/" 
              className={`flex items-center gap-1 p-1.5 rounded-md transition-colors ${
                isActive('/') ? 'text-accent bg-accent/10' : 'hover:text-accent'
              }`}
            >
              <Home size={18} />
              <span className="hidden md:inline">Home</span>
            </Link>
            <Link 
              href="/tasks" 
              className={`flex items-center gap-1 p-1.5 rounded-md transition-colors ${
                isActive('/tasks') ? 'text-accent bg-accent/10' : 'hover:text-accent'
              }`}
            >
              <ScrollText size={18} />
              <span className="hidden md:inline">Tasks</span>
            </Link>
            <Link 
              href="/new" 
              className={`flex items-center gap-1 p-1.5 rounded-md transition-colors ${
                isActive('/create-task') ? 'text-accent bg-accent/10' : 'hover:text-accent'
              }`}
            >
              <PlusSquare size={18} />
              <span className="hidden md:inline">Create</span>
            </Link>
            <Link 
              href="/feed" 
              className={`flex items-center gap-1 p-1.5 rounded-md transition-colors ${
                isActive('/feed') ? 'text-accent bg-accent/10' : 'hover:text-accent'
              }`}
            >
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Feed</span>
            </Link>
            
            {/* User Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-accent/20 hover:border-accent/50 transition-colors"
              >
                {userData?.avatar ? (
                  <img 
                    src={userData.avatar} 
                    alt={userData.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={16} className="text-primary" />
                )}
              </button>
              
              {showDropdown && userData && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card border border-border z-50"
                >
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground">
                      {getGreeting()}, {userData.username}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {userData.email}
                    </p>
                  </div>
                  <div className="border-t border-border">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link 
              href="/login" 
              className={`hover:text-accent transition-colors flex items-center gap-1 p-1.5 rounded-md ${
                isActive('/login') ? 'text-accent bg-accent/10' : ''
              }`}
            >
              <LogIn size={18} />
              <span className="hidden md:inline">Login</span>
            </Link>
            <Link 
              href="/register" 
              className="bg-accent text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-1 text-sm md:text-base"
            >
              <UserPlus size={18} />
              <span className="hidden md:inline">Get Started</span>
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}