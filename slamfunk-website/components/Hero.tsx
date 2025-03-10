"use client";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";

export default function MarchMadnessHero() {
  const targetDate = "2025-03-16T23:59:59";

  return (
    <section className="text-center my-32 mx-4 sm:mx-8 md:mx-16 lg:mx-24 relative">
      {/* YOINKED bball */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="basketball-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="12" fill="none" stroke="#F97316" strokeWidth="2" />
            <path d="M13,25 H37" stroke="#F97316" strokeWidth="2" />
            <path d="M25,13 V37" stroke="#F97316" strokeWidth="2" />
            <path d="M17,17 Q25,25 33,33" stroke="#F97316" strokeWidth="2" fill="none" />
            <path d="M17,33 Q25,25 33,17" stroke="#F97316" strokeWidth="2" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#basketball-pattern)" />
        </svg>
      </div>

      <div className="relative">
        <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-md mb-6 transform -rotate-2">
          TAMU Datathon presents
        </span>
      </div>

      <h1 className="font-sans text-3xl tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl dark:text-white mb-6">
        March Madness <span className="text-orange-500">Mania!</span>
      </h1>

      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-light max-w-4xl mx-auto">
        Whether you're a March Madness enthusiast, a data-driven strategist, or both, this competition offers
        two exciting tracks: <span className="font-semibold text-teal-400">Best Bracket</span> and
        <span className="font-semibold text-orange-500"> Best Data Science Write-Up</span>. Compete for prizes and
        campus recognition by predicting the tournament's outcome or showcasing your analytical skills.
      </p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Time Remaining Until Selection Sunday:</h3>
        <h4 className="text-med font-semibold text-gray-700 dark:text-gray-300">March 16th, 2025</h4>
      </div>
      
      <CountdownTimer targetDate={targetDate} />
      
      <div className="mt-4 mb-8">
        <p className="text-blue-600 dark:text-blue-400 font-medium italic">Registration will be released shortly!</p>
      </div>

      <div className="flex justify-center space-x-6">
        {/* Registration link commented out until ready 
        <Link
          href="/register"
          className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-3 rounded-md text-lg font-semibold hover:opacity-90 transition duration-300 transform hover:-translate-y-1"
        >
          Register Now
        </Link>
        */}
      </div>
    </section>
  );
}