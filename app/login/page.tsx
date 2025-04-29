import { Metadata } from "next";
import Login from "@/components/Login";

export const metadata: Metadata = {
  title: "Login | CentricTask",
  description: "Access your CentricTask account",
};

export default function LoginPage() {
  return <Login />;
}