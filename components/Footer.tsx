'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <h3 className="text-2xl font-bold mb-4">
              Centric<span className="text-accent">Task</span>
            </h3>
            <p className="text-text-light">
              The ultimate task management solution for teams and individuals.
            </p>
          </motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold mb-4 text-white dark:text-white/90">Quick Links</h4>
            <ul className="space-y-3">
              {links.slice(0, 2).map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-text-light dark:text-text-light/80 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold mb-4 text-white dark:text-white/90">Company</h4>
            <ul className="space-y-3">
              {links.slice(2).map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-text-light dark:text-text-light/80 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:pl-4"
          >
            <h4 className="font-bold mb-4 text-white dark:text-white/90">Follow Us</h4>
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="bg-white/10 dark:bg-white/20 p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/30 transition-colors"
                  aria-label={`Follow us on ${social.icon.type.name}`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 dark:border-white/20 mt-12 pt-8 text-center text-text-light"
        >
          <p>© {new Date().getFullYear()} CentricTask. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
