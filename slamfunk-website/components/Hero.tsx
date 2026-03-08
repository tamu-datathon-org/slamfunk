"use client";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";

export default function MarchMadnessHero() {
  const targetDate = "2026-03-19T23:59:59";

  return (
    <section className="text-center my-32 mx-4 sm:mx-8 md:mx-16 lg:mx-24 relative">
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

      <div className="relative mb-8">
        <h2 className="text-gray-800 dark:text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl tracking-widest font-bold uppercase mb-4">
          TAMU DATATHON PRESENTS
        </h2>
      </div>

      <h1
        className="text-black dark:text-white font-bold leading-none mb-6"
        style={{
          fontFamily: 'Harlem, sans-serif',
          fontSize: 'clamp(4rem, 15vw, 12rem)',
          textShadow: '4px 4px 0px rgba(0, 0, 0, 0.2)',
          letterSpacing: '-0.02em'
        }}
      >
        MARCH MADNESS
      </h1>

      <div className="mb-4">
        <h3 className="text-sm sm:text-base tracking-widest font-bold uppercase text-gray-800 dark:text-gray-200">Time Remaining until Brackets are Due!:</h3>
        <h4 className="text-sm sm:text-base tracking-widest font-bold uppercase text-gray-800 dark:text-gray-200">March 19, 2026 (11:59 PM)</h4>
      </div>

      <CountdownTimer targetDate={targetDate} />

      <div className="flex justify-center space-x-6 mt-6">
        <Link
          href="/bracket"
          className="bg-white text-black px-6 py-3 rounded-md text-lg font-semibold hover:opacity-90 transition duration-300 transform hover:-translate-y-1"
        >
          Build a Bracket
        </Link>
        <Link
          href="/writeup"
          className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:opacity-90 transition duration-300 transform hover:-translate-y-1"
        >
          Writeups
        </Link>
      </div>
    </section>
  );
}
