// components/ClaimedTasks.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  User,
  ArrowLeft,
  CalendarDays,
  DollarSign,
  XCircle,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "./NavBar";
import toast from "react-hot-toast";

type Task = {
  _id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  createdAt: string;
  isClaimed: boolean;
  createdBy: {
    _id: string;
    username: string;
    avatar?: string;
  };
  claimedBy?: {
    _id: string;
    username: string;
    avatar?: string;
  };
};

export default function ClaimedTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Get current user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (user) {
      try {
        const userData = JSON.parse(user);
        setCurrentUserId(userData._id || userData.id);
      } catch (err) {
        console.error('Error parsing user data', err);
      }
    }
  }, []);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/my-tasks`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchTasks();
    }
  }, [currentUserId]);

  const handleClaimTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}/claim`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to claim task');
      }
  
      const updatedTask = await response.json();
      
      // Get current user data
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const claimedBy = {
        _id: user._id || user.id,
        username: user.username,
        avatar: user.avatar
      };
  
      // Preserve the original createdBy data
      const originalTask = tasks.find(task => task._id === taskId);
      
      setTasks(tasks.map(task => 
        task._id === taskId ? {
          ...task, 
          ...updatedTask, // Apply updates from server
          isClaimed: true,
          claimedBy: claimedBy,
          createdBy: originalTask?.createdBy
        } : task
      ));
  
      toast.success('Task claimed successfully!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to claim task');
    }
  };

  const handleUnclaimTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}/unclaim`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to unclaim task');
      }
  
      const updatedTask = await response.json();
      const originalTask = tasks.find(task => task._id === taskId);
      
      setTasks(tasks.map(task => 
        task._id === taskId ? {
          ...task, // Preserve all original data
          ...updatedTask, // Apply server updates
          isClaimed: false,
          claimedBy: undefined,
          createdBy: originalTask?.createdBy 
        } : task
      ));
  
      toast.success('Task unclaimed successfully!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to unclaim task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete task');
      }

      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-12 w-12 text-accent" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
              <span>My Tasks</span>
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
              No tasks found
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                whileHover={{ y: -5 }}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card dark:bg-gray-800"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {task.createdBy.avatar ? (
                        <img 
                          src={task.createdBy.avatar} 
                          alt={task.createdBy.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <User className="text-primary" size={18} />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{task.createdBy.username}</p>
                        <p className="text-sm text-muted-foreground">
                          Posted: {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {task.createdBy._id === currentUserId && (
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        aria-label="Delete task"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-secondary">
                    {task.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{task.description}</p>

                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-muted-foreground" />
                      <span className="text-sm">
                        Budget: ${task.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-muted-foreground" />
                      <span className="text-sm text-red-500">
                        Deadline: {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t px-5 py-3 bg-gray-50 dark:bg-gray-700">
                  <div className="flex justify-between items-center">
                    {task.isClaimed ? (
                      task.claimedBy?._id === currentUserId ? (
                        <button
                          onClick={() => handleUnclaimTask(task._id)}
                          className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 px-4 py-2 rounded-lg transition-colors"
                        >
                          <XCircle size={18} />
                          Unclaim
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          {task.claimedBy?.avatar ? (
                            <img
                              src={task.claimedBy.avatar}
                              alt={task.claimedBy.username}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                              <User className="text-primary" size={12} />
                            </div>
                          )}
                          <span className="text-sm text-red-500">
                            Claimed by {task.claimedBy?.username || "someone"}
                          </span>
                        </div>
                      )
                    ) : (
                      <button
                        onClick={() => handleClaimTask(task._id)}
                        className="flex items-center gap-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-200 dark:hover:bg-teal-900/50 px-4 py-2 rounded-lg transition-colors"
                        disabled={task.createdBy._id === currentUserId}
                      >
                        <CheckCircle size={18} />
                        Claim Task
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {tasks.length > 0 && (
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
        )}
      </motion.main>
    </div>
  );
}