import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Outfit ({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "HubPostTask | Task Management Made Simple",
  description: "The ultimate task management solution for teams and individuals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning  className="scroll-smooth">
      <body  className={inter.className}>
        <ThemeProvider>
        <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
          
        },
        success: {
          iconTheme: {
            primary: "hsl(var(--primary))",
            secondary: "hsl(var(--primary-foreground))",
            
          },
          icon: '✅',
        },
        error: {
          iconTheme: {
            primary: "hsl(var(--destructive))",
            secondary: "hsl(var(--destructive-foreground))",
          },
          icon: '❌',
        },
      }}
    />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}