"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Rocket } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const features = [
    "Task Management Made Simple",
    "Real-time Collaboration",
    "Secure & Reliable",
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-2 bg-primary dark:bg-primary text-secondary-text dark:text-white px-4 py-2 rounded-full mb-6"
      >
        <Rocket size={18} />
        <span>Introducing HubPostTask</span>
      </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
          Streamline Your <span className="text-accent">Workflow</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-text-light max-w-3xl mx-auto mb-8 sm:mb-10">
          The ultimate task management solution for teams and individuals. Post, claim, 
          and track tasks with ease while ensuring no overlaps or conflicts.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16">
          <Link
            href="/register"
            className="bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight size={18} />
          </Link>
          <Link
            href="#features"
            className="border border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
          >
            Learn More
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base"
            >
              <Check size={16} />
              {feature}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
