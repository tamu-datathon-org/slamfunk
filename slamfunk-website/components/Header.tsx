// "use client"

// import Link from "next/link";
// // import ThemeSwitch from "./ThemeSwitch";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useState, useRef, useEffect, use } from "react";

// type DropdownItem = {
//     label: string;
//     href: string;
//     description?: string;
// };

// type NavItem = {
//     name: string;
//     href?: string;
//     dropdown?: DropdownItem[];
// };

// const navItems: NavItem[] = [
//     {name: "Leaderboard", href: "/leaderboard"},
//     {name: "Bracket", href: "/bracket"},
//     {name: "Resources", dropdown:[
//             {label: "Write-up", href:"/writeup", description: "INSET HERE"},
//             { label: "Rules", href: "#faq-section", description: "Competition rules and FAQ" },
//         ],
//     },
// ];

// function DropdownMenu({items}: {items: DropdownItem[]}){
//     return(
//         <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white dark:bg-blue-950 rounded-xl shadow-xl border border-gray-100 dark:border-blue-800 overflow-hidden z-50 animate-in">
//             {items.map((item) => (
//                 <Link
//                 key={item.label}
//                 href={item.href}
//                 className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-blue-900 transition-colors group"
//                 >
//                 <span className="block text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
//                     {item.label}
//                 </span>
//                 {item.description && (
//                     <span className="block text-xs text-gray-500 dark:text-blue-300 mt-0.5">
//                     {item.description}
//                     </span>
//                 )}
//                 </Link>
//             ))}
//         </div>
//     );
// }

// export default function Header() {
//     const { data: session, status } = useSession();
//     const [openDropdown, setOpenDropdown] = useState<string | null>(null);

//     const [mobileOpen, setMobileOpen] = useState(false);
//     const headerRef = useRef<HTMLElement>(null);


//     const handleSignOut = async () => {
//         const { signOut } = await import("next-auth/react");
//         signOut({ callbackUrl: '/' });
//     };

//     useEffect(() => {
//             function handleClick(e: MouseEvent){
//                 if(headerRef.current && !headerRef.current.contains(e.target as Node)){
//                     setOpenDropdown(null);
//                     setMobileOpen(false);
//                 }
//             }
//             document.addEventListener("mousedown",handleClick);
//             return() => document.removeEventListener("mousedown", handleClick);

//     }, []);

//     return(
//         <header>
//             <div>
//                 <nav>
//                     {navItems.map((item)=>
//                         item.dropdown ? (
//                             <div key={item.name} className="relative">
//                                 <button
//                                     onClick={()=>
//                                         setOpenDropdown(openDropdown === item.name ? null :item.name)
//                                     }
//                                     className="flex items-center gap-4 text-sm text-grey-500 px-3 py-2 rounded-lg hover:bg-grey-400 "
//                                 >
//                                 </button>
//                             </div>
//                         )
//                     )}
//                 </nav>
//             </div>
//         </header>
//     );



// //   return (
// //     <header className="bg-white dark:bg-gradient-to-r dark:from-blue-950 dark:to-blue-900 shadow-sm border-b border-gray-100 dark:border-blue-800">
// //       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
// //         <div className="flex items-center">
// //           <Link href="/" className="flex items-center">
// //             <Image
// //               src="/basketball.png"
// //               alt="TAMU Datathon"
// //               width={48}
// //               height={48}
// //             />
// //           </Link>
// //         </div>
// //         <nav className="flex items-center">
// //           <ul className="flex space-x-1 mr-2 items-center">
// //             <li>
// //               <Link
// //                 href="/"
// //                 className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
// //               >
// //                 Home
// //               </Link>
// //             </li>
// //             <li>
// //               <Link
// //                 href="/leaderboard"
// //                 className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
// //               >
// //                 Leaderboard
// //               </Link>
// //             </li>

// //             <li>
// //               <Link
// //                 href="/writeup"
// //                 className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
// //               >
// //                 Writeup
// //               </Link>
// //             </li>
// //             <li>
// //               <Link
// //                 href="/bracket"
// //                 className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
// //               >
// //                 Bracket
// //               </Link>
// //             </li>
// //             <li>
// //               <Link
// //                 href="/writeup"
// //                 className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
// //               >
// //                 Writeup
// //               </Link>
// //             </li>
// //             <li>
// //               <a
// //                 href="#faq-section"
// //                 className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
// //               >
// //                 Rules
// //               </a>
// //             </li>
// //             {status === "authenticated" ? (
// //               <li>
// //                 <button
// //                   onClick={handleSignOut}
// //                   className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
// //                 >
// //                   Logout
// //                 </button>
// //               </li>
// //             ) : (
// //               <li>
// //                 <Link
// //                   href="/login"
// //                   className="text-sm bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-md hover:opacity-90 transition-colors"
// //                 >
// //                   Login
// //                 </Link>
// //               </li>
// //             )}
// //           </ul>
// //           <ThemeSwitch />
// //         </nav>
// //       </div>
// //     </header>
// //   );
// }


"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import ThemeSwitch from "./ThemeSwitch";

type DropdownItem = {
  label: string;
  href: string;
  description?: string;
};

type NavItem = {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
};

const navItems: NavItem[] = [
  {
    name: "Leaderboard",
    href: "/leaderboard",
  },
  {
    name: "Bracket",
    href: "/bracket",
  },
  {
    name: "Resources",
    dropdown: [
      { label: "Write-up", href: "/writeup", description: "Read the full competition write-up" },
      { label: "Rules", href: "#faq-section", description: "Competition rules and FAQ" },
    ],
  },
];

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

export default function Header() {
  const { data: session, status } = useSession();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleSignOut = async () => {
    const { signOut } = await import("next-auth/react");
    signOut({ callbackUrl: "/" });
  };

  // Close dropdown on outside click
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
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white/80 dark:bg-blue-950/90 backdrop-blur-md border-b border-gray-100 dark:border-blue-800 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/basketball.png"
            alt="TAMU Datathon"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="hidden sm:block font-semibold text-gray-900 dark:text-white text-sm tracking-tight">
            TAMU Datathon
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.name} className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.name ? null : item.name)
                  }
                  className="flex items-center gap-1 text-sm text-gray-700 dark:text-blue-100 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-blue-800 transition-colors font-medium"
                >
                  {item.name}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openDropdown === item.name ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {openDropdown === item.name && (
                  <DropdownMenu items={item.dropdown} />
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href!}
                className="text-sm text-gray-700 dark:text-blue-100 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-blue-800 transition-colors font-medium"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* <ThemeSwitch /> */}

          {/* Auth button */}
          {status === "authenticated" ? (
            <button
              onClick={handleSignOut}
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
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-blue-200 hover:bg-gray-100 dark:hover:bg-blue-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
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
              <button
                onClick={handleSignOut}
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