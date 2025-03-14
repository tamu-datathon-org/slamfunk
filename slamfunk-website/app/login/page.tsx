"use client";
import Header from "components/Header";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";

export default function LoginPage() {
    // redirect if user is already authenticated
    const { status } = useSession();
    if (status === "loading") { return <></>; }
    if (status === "authenticated") { return redirect("/"); }

  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900">
      <Header />
      <div className="w-full my-auto h-full grid place-items-center">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Log In</h4>
          <p className="mb-6 text-gray-600 dark:text-gray-300">Please use your TAMU email to log in!</p>
          <button
            type="button"
            onClick={handleLogin}
            className="flex items-center gap-x-2 px-4 py-2 text-white bg-black rounded-lg mx-auto hover:bg-gray-800 transition-colors"
          >
            <FcGoogle className="text-xl" />
            <span>Log In with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
