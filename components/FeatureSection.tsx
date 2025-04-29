"use client";

import { motion } from "framer-motion";
import { Lock, Users, Bell, Eye, EyeOff } from "lucide-react";

const features = [
  {
    icon: <Users size={32} />,
    title: "Collaborative",
    description: "Work seamlessly with your team members on shared tasks.",
    color: "text-secondary",
  },
  {
    icon: <Lock size={32} />,
    title: "Secure",
    description: "Robust authentication and data protection measures.",
    color: "text-accent",
  },
  {
    icon: <Bell size={32} />,
    title: "Real-time",
    description: "Instant updates when tasks are claimed or completed.",
    color: "text-warning",
  },
  {
    icon: <Eye size={32} />,
    title: "Visibility",
    description: "Clear view of available tasks and your claimed tasks.",
    color: "text-primary",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6 bg-primary/5 dark:bg-primary/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Everything you need to manage tasks efficiently and collaboratively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`${feature.color} mb-4`}>{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-text-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}