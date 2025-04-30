"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AuthRedirectProps {
  requireAuth: boolean;
  redirectTo?: string;
}

export default function AuthRedirect({ requireAuth, redirectTo = "/login" }: AuthRedirectProps) {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      const token = localStorage.getItem("token");
      
      if (requireAuth) {
        // For protected routes
        if (!token) {
          toast.error('Please login to access this page', {
            duration: 3000,
            position: 'top-center',
          });
          router.push(redirectTo);
          return;
        }

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            throw new Error("Session expired");
          }

          setIsCheckingAuth(false);
        } catch (error) {
          toast.error('Please login again', {
            duration: 3000,
            position: 'top-center',
          });
          router.push(redirectTo);
        }
      } else {
        // For auth routes (login/register) - redirect if already logged in
        if (token) {
          router.push("/feed");
        } else {
          setIsCheckingAuth(false);
        }
      }
    };

    checkAuth();
  }, [requireAuth, router, redirectTo]);

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return null;
}