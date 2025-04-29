import { Metadata } from "next";
import TaskFeed from "@/components/TaskFeed";

export const metadata: Metadata = {
  title: "Task Feed | CentricTask",
  description: "Browse and claim available tasks",
};

export default function FeedPage() {
  return <TaskFeed />;
}