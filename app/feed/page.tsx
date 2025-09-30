import { Metadata } from "next";
import TaskFeed from "@/components/TaskFeed";
import AuthRedirect from "@/components/AuthRedirect";

export const metadata: Metadata = {
  title: "Task Feed | HubPostTask",
  description: "Browse and claim available tasks",
};

export default function FeedPage() {
  return( 
    <>
     <AuthRedirect requireAuth={true} />
  <TaskFeed />
  </>
  )
}