import AuthRedirect from "@/components/AuthRedirect"
import CreateTask from "@/components/Create"

const page = () => {
    return (
        <div>
             <AuthRedirect requireAuth={true} />
            <CreateTask/>
        </div>
    )
}

export default page