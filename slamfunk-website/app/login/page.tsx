"use client"
import Header from "components/Header"
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {

    const handleLogin = () => {

    }

    return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900">
        <Header/>
        <div className="w-full my-auto h-full grid place-items-center">
            <h4 className="text-xl font-bold mb-2">Log In</h4>
            <button
                type="button"
                onClick={handleLogin}
                className="flex items-center gap-x-2 px-4 py-2 text-white bg-black rounded-lg"
            >
                <FcGoogle />
                Log In with Google
            </button>
        </div>
    </div>
    )
}
