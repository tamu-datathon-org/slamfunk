"use client";
import Header from "components/Header";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900">
      <Header />
      <div className="w-full my-auto h-full grid place-items-center">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center max-w-md">
          <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Authentication Error</h4>
          {error === "AccessDenied" ? (
            <>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Only Texas A&M University (@tamu.edu) email addresses are allowed to access the March Madness Arena!
              </p>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Please try again with your TAMU email.
              </p>
            </>
          ) : (
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              An error occurred during the authentication process. Please try again.
            </p>
          )}
          <Link
            href="/login"
            className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg mx-auto hover:bg-blue-700 transition-colors"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}