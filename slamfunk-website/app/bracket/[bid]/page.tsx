"use client";
import Header from "components/Header"
import { useEffect, useState } from "react";
import { Bracket } from "app/api/bracket/route";
import { redirect, useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import MarchMadnessBracket from "components/MarchMadnessBracket";

export default function EditBracket() {
    const { bid } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [bracket, setBracket] = useState<Bracket | null>(null);
    const [userId, setuserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async() => { 
            const session = await getSession();
            const userId = session?.user?.id;
            setuserId(userId);
            const res = await fetch(`/api/bracket/get/${bid}`)
            if (res.ok) {
                const data = await res.json();
                setBracket(data);
            }
            setLoading(false);
        }

        fetchData();
    }, [])

    if (loading) { return <></>; }
    if (!bracket) { return redirect(`/error?error=error getting bracket`); }
    if (!userId) { return redirect('/login'); }

    return (
        <div className='flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900'>
            <Header/>
            <div className='w-full p-4 md:p-6 lg:p-8'>
                <h1 className='mt-8 text-4xl font-bold'>Bracket</h1>
                <h4 className='text-gray-600 text-lg'>
                    Edit your brackets below. Click the "Submit Bracket" button below once you're done.
                </h4>
                <MarchMadnessBracket
                    submissionId={bracket.id}
                    userID={userId!}
                    roundData={bracket}
                />
            </div>
        </div>

    )
}
