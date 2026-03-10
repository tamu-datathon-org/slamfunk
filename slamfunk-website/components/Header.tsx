"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import React from "react";

type DropdownItem = {
    label: string;
    href: string;
    description?: string;
};
// NOTE: just keeping this here for rn idk if its gonna be needed later - layla
function DropdownMenu({ items }: { items: DropdownItem[] }) {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white dark:bg-blue-950 rounded-xl shadow-xl border border-gray-100 dark:border-blue-800 overflow-hidden z-50 animate-in">
            {items.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-blue-900 transition-colors group"
                >
                <span className="block text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {item.label}
                </span>

                {item.description && (
                    <span className="block text-xs text-gray-500 dark:text-blue-300 mt-0.5">
                    {item.description}
                    </span>
                )}
                </Link>
            ))}
        </div>
    );
}

type NavItem = {
    name: string;
    href?: string;
    dropdown?: DropdownItem[];
};

const navItems: NavItem[] = [
  {
    name: "LEADERBOARD",
    href: "/leaderboard",
  },
  {
    name: "BRACKET",
    href: "/bracket",
  },
  {name: "WRITE-UP", href:"/writeup"},
  {name: "RULES", href:"/rules"}

//   {
//     name: "Resources",
//     dropdown: [
//       { label: "Write-up", href: "/writeup", description: "Read the full competition write-up" },
//       { label: "Rules", href: "#faq-section", description: "Competition rules and FAQ" },
//     ],
//   },

];


export default function Header() {
    const { data: session, status } = useSession();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    const handleSignOut = async () => {
        const { signOut } = await import("next-auth/react");
        signOut({ callbackUrl: "/" });
    };


    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
                setMobileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);

    }, []);

    return (
        <header className="sticky top-0 z-50 bg-[#1e3a5f] border-b-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* home TEMP */}
                <Link href="/" className="text-white font-bold text-lg tracking-wide hover:text-gray-200 transition-colors">
                    {/* <Image
                        src="/basketball.png"
                        alt="TAMU Datathon"
                        width={36}
                        height={36}
                        className="rounded-md"
                    />
                    <span className="hidden sm:block font-semibold text-gray-900 dark:text-white text-sm tracking-tight">
                        TAMU Datathon
                    </span> */}
                    HOME
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
                    {navItems.map((item, index) => (
                        <div key={item.name} className="flex items-center">
                            {index > 0 && (
                                <span className="text-white mx-3">★</span>
                            )}
                            <Link
                                href={item.href}
                                className="text-white font-bold text-sm tracking-widest hover:text-gray-200 transition-colors"
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                    <span className="text-white mx-3">★</span>
                </nav>

                {/* auth button */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {status === "authenticated" ? (
                        <button onClick={handleSignOut}
                            className="hidden md:inline-flex items-center text-sm font-medium text-gray-600 dark:text-blue-200 hover:text-red-500 dark:hover:text-red-400 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                        Logout
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="hidden md:inline-flex items-center text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                        >
                        Sign in
                        </Link>
                    )}

                    {/* Mobile hamburger */}
                    <button className="md:hidden p-2 rounded-lg text-gray-600 dark:text-blue-200 hover:bg-gray-100 dark:hover:bg-blue-800 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-gray-100 dark:border-blue-800 bg-white dark:bg-blue-950 px-4 py-3 flex flex-col gap-1">
                    {navItems.map((item) =>
                        item.dropdown ? (
                            <div key={item.name}>
                                <p className="text-xs font-semibold text-gray-400 dark:text-blue-400 uppercase tracking-wider px-3 pt-3 pb-1">
                                    {item.name}
                                </p>

                                {item.dropdown.map((sub) => (
                                    <Link
                                        key={sub.label}
                                        href={sub.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block text-sm text-gray-700 dark:text-blue-100 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-blue-900 transition-colors"
                                    >
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <Link
                                key={item.name}
                                href={item.href!}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-gray-700 dark:text-blue-100 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-blue-900 transition-colors font-medium"
                            >
                                {item.name}
                            </Link>
                        )
                    )}

                    <div className="pt-2 border-t border-gray-100 dark:border-blue-800 mt-1">
                        {status === "authenticated" ? (
                            <button onClick={handleSignOut}
                                    className="w-full text-left text-sm font-medium text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="block text-center text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors"
                            >
                            Sign in
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}