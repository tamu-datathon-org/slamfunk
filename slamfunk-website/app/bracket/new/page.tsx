"use client";

import { generateSampleMatches } from "components/bracket-utils";
import Header from "components/Header"
import MarchMadnessBracket from "components/MarchMadnessBracket"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

export default function NewBracket() {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const fetchSession = async() => {
            const session = await getSession();
            const userId = session?.user?.id;
            setUserId(userId);
            setLoading(false);
        }

        fetchSession();

    }, [])

    if (loading) { return <></>; }
    if (!userId) { return redirect('/login'); }

    return (
        <div className='flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900'>
            <Header/>
            <div className='w-full p-4 md:p-6 lg:p-8'>
                <h1 className='mt-8 text-4xl font-bold'>New Bracket</h1>
                <h4 className='text-gray-600 text-lg'>
                    Fill out your brackets below. Click the "submit" button below once your are done.
                </h4>
                <MarchMadnessBracket
                    initialMatches={generateSampleMatches()}
                    submissionId={crypto.randomUUID().toString()}
                    userID={userId!}
                />
            </div>
        </div>
    )
}
