import AuthRedirect from "@/components/AuthRedirect"
import ClaimedTasks from "@/components/tasks"

const page = () => {
    return (
        <div>
             <AuthRedirect requireAuth={true} />
            <ClaimedTasks/>
        </div>
    )
}

export default page