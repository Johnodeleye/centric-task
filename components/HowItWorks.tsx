"use client";

import { motion } from "framer-motion";
import { ClipboardList, UserPlus, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={24} />,
    title: "Sign Up",
    description: "Create your account in seconds",
    color: "bg-secondary",
  },
  {
    icon: <ClipboardList size={24} />,
    title: "Post Tasks",
    description: "Add tasks with details and budget",
    color: "bg-accent",
  },
  {
    icon: <CheckCircle size={24} />,
    title: "Claim & Complete",
    description: "Team members can claim and complete tasks",
    color: "bg-warning",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Simple steps to streamline your task management process.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1 w-3/4 bg-primary bg-opacity-20 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className={`${step.color} text-white w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-text-light">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}