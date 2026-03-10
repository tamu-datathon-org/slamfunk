"use client";

import { generateSampleMatches } from "components/bracket-utils";
import Header from "components/Header"
import MarchMadnessBracket from "components/MarchMadnessBracket"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";
import Image from "next/image";

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
        <div className='flex flex-col min-h-screen'>
            <Header/>
            <div className='relative w-full overflow-hidden py-8 flex-1'>
                <div className='absolute inset-0 bg-[#1e3a5f]'>
                    <Image
                        src="/background.svg"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className='relative z-10 w-full p-4 md:p-6 lg:p-8'>
                    <h1 className='mt-8 text-4xl font-bold text-white' style={{ fontFamily: 'Bayon, sans-serif' }}>Create New Bracket</h1>
                    <h4 className='text-white text-lg' style={{ fontFamily: 'Bayon, sans-serif' }}>
                        Fill out your March Madness bracket and submit your predictions
                    </h4>
                    <MarchMadnessBracket
                        initialMatches={generateSampleMatches()}
                        submissionId={crypto.randomUUID().toString()}
                        userID={userId!}
                    />
                </div>
            </div>
        </div>
    )
}
