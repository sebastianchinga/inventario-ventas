import { Outlet } from "react-router-dom"

const LoginLayout = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Outlet />
            </div>
        </div>
    )
}

export default LoginLayout