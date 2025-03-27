"use client"

import Header from "components/Header";
import Leaderboard from "components/Leaderboard";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex gap-y-6 flex-col ">
            <h1 className="text-3xl font-bold sm:text-4xl">Leaderboard</h1>
            <Leaderboard/>
        </div>
      </div>
    </div>
  );
}
