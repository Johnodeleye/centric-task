// components/TaskFeed.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Share2,
  User,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import {Navbar} from "./NavBar";

// Dummy data type
type Task = {
  id: string;
  title: string;
  description: string;
  budget: number;
  createdAt: string;
  user: {
    name: string;
    avatar?: string;
  };
  claimed?: boolean;
};

const TaskFeed = () => {
  // Dummy data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Website Redesign",
      description: "Need a complete redesign of our company website with modern UI/UX principles.",
      budget: 1200,
      createdAt: "2023-05-15T10:30:00Z",
      user: {
        name: "Alex Johnson",
      },
      claimed: false,
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Looking for a React Native developer to build a cross-platform mobile app.",
      budget: 2500,
      createdAt: "2023-05-16T14:45:00Z",
      user: {
        name: "Sarah Williams",
      },
      claimed: false,
    },
    {
      id: "3",
      title: "E-commerce Integration",
      description: "Integrate Shopify with our existing inventory management system.",
      budget: 1800,
      createdAt: "2023-05-17T09:15:00Z",
      user: {
        name: "Michael Chen",
      },
      claimed: false,
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve our website's search engine rankings and organic traffic.",
      budget: 900,
      createdAt: "2023-05-18T11:20:00Z",
      user: {
        name: "Emily Davis",
      },
      claimed: false,
    },
  ]);

  const [currentUser] = useState({
    id: "user-123",
    name: "John Doe",
  });

  const handleClaimTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, claimed: true } : task
    ));
  };

  const handleUnclaimTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, claimed: false } : task
    ));
  };

  const handleShareTask = (taskId: string) => {
    const taskUrl = `${window.location.origin}/tasks/${taskId}`;
    navigator.clipboard.writeText(taskUrl);
    alert("Task link copied to clipboard!");
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            Available <span className="text-accent">Tasks</span>
          </h1>
          <Link
            href="/new"
            className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
          >
            <PlusCircle size={18} />
            <span className="hidden sm:inline">Post Task</span>
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No tasks available at the moment. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ y: -5 }}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card dark:bg-gray-800"
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <User className="text-primary dark:text-primary" size={18} />
                    </div>
                    <div>
                      <p className="font-medium">{task.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-secondary">
                    {task.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{task.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-accent dark:text-accent">
                      ${task.budget.toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShareTask(task.id)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Share task"
                      >
                        <Share2 size={18} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t px-5 py-3 bg-gray-50 dark:bg-gray-700">
                  {task.claimed ? (
                    <button
                      onClick={() => handleUnclaimTask(task.id)}
                      className="w-full flex items-center justify-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 px-4 py-2 rounded-lg transition-colors"
                    >
                      <XCircle size={18} />
                      Unclaim Task
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaimTask(task.id)}
                      className="w-full flex items-center justify-center gap-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-200 dark:hover:bg-teal-900/50 px-4 py-2 rounded-lg transition-colors"
                    >
                      <CheckCircle size={18} />
                      Claim Task
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ChevronLeft size={18} className="text-muted-foreground" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary text-white dark:bg-primary dark:text-white">
              1
            </button>
            <button className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-muted-foreground">
              2
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default TaskFeed;