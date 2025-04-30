import { Metadata } from "next";
import Login from "@/components/Login";
import AuthRedirect from "@/components/AuthRedirect";

export const metadata: Metadata = {
  title: "Login | CentricTask",
  description: "Access your CentricTask account",
};

export default function LoginPage() {
    return (
      <>
        <AuthRedirect requireAuth={false} />
        <Login />
    
      </>
    );
  }