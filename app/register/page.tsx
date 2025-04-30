import type { Metadata } from "next";
import Register from "@/components/Register";
import AuthRedirect from "@/components/AuthRedirect";

export default function RegisterPage() {
    return (
      <>
        <AuthRedirect requireAuth={false} />
        <Register />
        {/* <InstallButton/> */}
      </>
    );
  }