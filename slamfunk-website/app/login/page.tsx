"use client";
import Header from "components/Header";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    // redirect if user is already authenticated
    const { status } = useSession();
    if (status === "authenticated") { return redirect("/"); }

  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="relative w-full overflow-hidden py-8 flex-1">
        <div className="absolute inset-0 bg-[#1e3a5f]">
          <Image
            src="/background.svg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 w-full p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center max-w-md">
            <div className="mb-8 flex justify-center">
              <Image
                src="/tamu.png"
                alt="TAMU Logo"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
              <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white" style={{ fontFamily: 'Bayon, sans-serif' }}>
                Log In
              </h4>
              <p className="mb-6 text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Bayon, sans-serif' }}>
                Please use your TAMU email to log in!
              </p>
              {status === "loading" ? (
                <div className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Bayon, sans-serif' }}>Loading...</div>
              ) : (
                <button
                  type="button"
                  onClick={handleLogin}
                  className="flex items-center gap-x-2 px-6 py-3 text-white bg-black rounded-lg mx-auto hover:bg-gray-800 transition-colors"
                  style={{ fontFamily: 'Bayon, sans-serif' }}
                >
                  <FcGoogle className="text-2xl" />
                  <span>Log In with Google</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
