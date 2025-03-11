import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gradient-to-r dark:from-blue-950 dark:to-blue-900 shadow-sm border-b border-gray-100 dark:border-blue-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/tdlogo.png"
              alt="TAMU Datathon"
              width={80}
              height={80}
            />
          </Link>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-1 mr-2">
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
                href="#competition-tracks"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
              >
                Challenge
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
            {/* Registration link commented out until ready
            <li>
              <Link
                href="/register"
                className="text-sm bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-md hover:opacity-90 transition-colors"
              >
                Register
              </Link>
            </li>
            */}
            <li>
              <a
                href="#footersec"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  );
}