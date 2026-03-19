"use client";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import Image from "next/image";

export default function MarchMadnessHero() {
  const targetDate = "2026-04-04T23:59:00";

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-[#1e3a5f]">
        <Image
          src="/background.svg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute left-0 bottom-0 w-[35%] md:w-[30%] h-[90%] hidden sm:block">
        <Image
          src="/left_player.svg"
          alt="Basketball Player Left"
          fill
          className="object-contain object-bottom-left"
          style={{ objectPosition: 'left bottom' }}
        />
      </div>
      <div className="absolute right-0 bottom-0 w-[32%] md:w-[27%] h-[85%] hidden sm:block">
        <Image
          src="/right_player.svg"
          alt="Basketball Player Right"
          fill
          className="object-contain object-bottom-right"
          style={{ objectPosition: 'right bottom' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-16 pb-12">
        <div className="mb-8">
          <Image
            src="/topped.svg"
            alt="March Madness"
            width={1400}
            height={350}
            className="w-full max-w-7xl h-auto"
            priority
          />
        </div>
        <div className="mb-8 text-center">
          <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider mb-2">
            TIME UNTIL WRITEUPS CLOSE:
          </h3>
          <h4 className="text-white text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide">
            APRIL 4, 2026 (11:59 PM CST)
          </h4>
        </div>
        <CountdownTimer targetDate={targetDate} />
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8">
          <Link
            href="/bracket"
            className="hover:opacity-90 transition duration-300 transform hover:scale-105 w-96 sm:w-[28rem] md:w-[32rem]"
          >
            <Image
              src="/build_button.svg"
              alt="Build a Bracket"
              width={400}
              height={100}
              className="w-full h-auto"
            />
          </Link>
          <Link
            href="/writeup"
            className="hover:opacity-90 transition duration-300 transform hover:scale-105 w-96 sm:w-[28rem] md:w-[32rem]"
          >
            <Image
              src="/writeups.svg"
              alt="Writeups"
              width={400}
              height={100}
              className="w-full h-auto"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
