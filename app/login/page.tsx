import { Metadata } from "next";
import Login from "@/components/Login";
import AuthRedirect from "@/components/AuthRedirect";

export const metadata: Metadata = {
  title: "Login | HubPostTask",
  description: "Access your HubPostTask account",
};

export default function LoginPage() {
    return (
      <>
        <AuthRedirect requireAuth={false} />
        <Login />
    
      </>
    );
  }