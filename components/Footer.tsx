'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const socials = [
    { icon: <Github size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-primary text-white dark:text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* ... (keep all the existing footer sections the same) ... */}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 dark:border-white/20 mt-12 pt-8 text-center text-text-light"
        >
          <p>© {new Date().getFullYear()} CentricTask. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Made with <Heart size={16} className="text-red-500 fill-red-500" /> by John Odeleye (P-DEV)
          </p>
        </motion.div>
      </div>
    </footer>
  );
}