"use client"

import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    const { signOut } = await import("next-auth/react");
    signOut({ callbackUrl: '/' });
  };

  return (
    <header className="bg-white dark:bg-gradient-to-r dark:from-blue-950 dark:to-blue-900 shadow-sm border-b border-gray-100 dark:border-blue-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/basketball.png"
              alt="TAMU Datathon"
              width={48}
              height={48}
            />
          </Link>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-1 mr-2 items-center">
            <li>
              <Link
                href="/"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/bracket"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
              >
                Bracket
              </Link>
            </li> 
            <li>
              <Link
                href="/writeup"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
              >
                Writeup
              </Link>
            </li> 
            <li>
              <a
                href="#faq-section"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
              >
                Rules
              </a>
            </li>
            {status === "authenticated" ? (
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="text-sm bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-md hover:opacity-90 transition-colors"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  );
}
