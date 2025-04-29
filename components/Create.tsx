// components/CreateTask.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ArrowLeft,
  PlusCircle,
  DollarSign,
  Calendar,
  Text,
  FileText,
  User,
  CheckCircle,
  XCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "./NavBar";

export default function CreateTask() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Frontend validation
    if (!formData.title.trim()) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Task created:", formData);
      setIsSubmitting(false);
      // Redirect to task feed after creation
      router.push("/feed");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/feed" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <PlusCircle className="text-accent" size={24} />
              <span>Create New Task</span>
            </h1>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 border"
          >
            <div className="space-y-6">
              {/* Title Field */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <label htmlFor="title" className="flex items-center gap-2 font-medium">
                  <Text size={18} className="text-primary" />
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Website Redesign"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all bg-background"
                  required
                />
              </motion.div>

              {/* Description Field */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <label htmlFor="description" className="flex items-center gap-2 font-medium">
                  <FileText size={18} className="text-primary" />
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the task in detail..."
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all bg-background"
                  required
                />
              </motion.div>

              {/* Budget and Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget Field */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label htmlFor="budget" className="flex items-center gap-2 font-medium">
                    <DollarSign size={18} className="text-primary" />
                    Budget ($)
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all bg-background"
                  />
                </motion.div>

                {/* Deadline Field */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <label htmlFor="deadline" className="flex items-center gap-2 font-medium">
                    <Calendar size={18} className="text-primary" />
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all bg-background"
                  />
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Creating...</span>
                    ) : (
                      <>
                        <CheckCircle size={18} />
                        Create Task
                      </>
                    )}
                  </button>

                  <Link
                    href="/feed"
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <XCircle size={18} />
                    Cancel
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </motion.main>
    </div>
  );
}