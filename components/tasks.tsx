// components/ClaimedTasks.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle,
  User,
  ArrowLeft,
  CalendarDays,
  DollarSign,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "./NavBar";

type Task = {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  claimedAt: string;
  user: {
    name: string;
    avatar?: string;
  };
  claimedBy: {
    name: string;
    id: string;
  };
};

export default function ClaimedTasks() {
  const [currentUser] = useState({
    id: "user-123",
    name: "John Doe",
  });

  // Dummy data for claimed tasks
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Website Redesign",
      description: "Complete redesign of company website with modern UI/UX principles. Need homepage, about, and contact pages.",
      budget: 1200,
      deadline: "2023-06-15",
      claimedAt: "2023-05-20T09:30:00Z",
      user: {
        name: "Alex Johnson",
      },
      claimedBy: {
        name: "John Doe",
        id: "user-123"
      }
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Build a cross-platform mobile app for iOS and Android using React Native.",
      budget: 2500,
      deadline: "2023-07-10",
      claimedAt: "2023-05-18T14:15:00Z",
      user: {
        name: "Sarah Williams",
      },
      claimedBy: {
        name: "John Doe",
        id: "user-123"
      }
    },
    {
      id: "3",
      title: "SEO Optimization",
      description: "Improve website search engine rankings and increase organic traffic.",
      budget: 900,
      deadline: "2023-06-01",
      claimedAt: "2023-05-22T11:20:00Z",
      user: {
        name: "Emily Davis",
      },
      claimedBy: {
        name: "John Doe",
        id: "user-123"
      }
    },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/feed" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <CheckCircle className="text-accent" size={24} />
              <span>My Claimed Tasks</span>
            </h1>
          </div>
        </div>

        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-card dark:bg-gray-800 rounded-xl border"
          >
            <p className="text-lg text-muted-foreground">
              No claimed tasks found
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card dark:bg-gray-800"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <User className="text-primary" size={18} />
                      </div>
                      <div>
                        <p className="font-medium">{task.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Claimed on {new Date(task.claimedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-secondary">
                    {task.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{task.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <DollarSign className="text-accent" size={18} />
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-medium">${task.budget.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays className="text-accent" size={18} />
                      <div>
                        <p className="text-sm text-muted-foreground">Deadline</p>
                        <p className="font-medium">
                          {new Date(task.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="text-accent" size={18} />
                      <div>
                        <p className="text-sm text-muted-foreground">Claimed By</p>
                        <p className="font-medium">{task.claimedBy.name}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="border-t px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end">
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <MoreVertical size={18} className="text-muted-foreground" />
                  </button>
                </div> */}
              </motion.div>
            ))}
          </div>
        )}
      </motion.main>
    </div>
  );
}