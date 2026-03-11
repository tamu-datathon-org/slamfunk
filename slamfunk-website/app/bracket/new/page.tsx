"use client";

import Header from "components/Header"
import Image from "next/image";
import Link from "next/link";

export default function NewBracket() {
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
                <div className='relative z-10 w-full p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[80vh]'>
                    <div className='text-center max-w-3xl'>
                        <h1 className='text-5xl md:text-6xl font-bold text-white mb-6' style={{ fontFamily: 'Bayon, sans-serif' }}>
                            BRACKETS OPEN ON SELECTION SUNDAY
                        </h1>
                        <p className='text-2xl md:text-3xl text-white mb-4' style={{ fontFamily: 'Bayon, sans-serif' }}>
                            Start building your bracket:
                        </p>
                        <p className='text-3xl md:text-4xl font-bold text-white mb-6' style={{ fontFamily: 'Bayon, sans-serif' }}>
                            MARCH 15, 2026 AT 5:00 PM CST
                        </p>
                        <p className='text-xl text-white mb-8 max-w-2xl mx-auto'>
                            Brackets will be available after the NCAA tournament teams are announced on Selection Sunday. Come back then to make your predictions!
                        </p>
                        <Link
                            href="/"
                            className='inline-block px-8 py-4 bg-white text-[#1e3a5f] rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors'
                            style={{ fontFamily: 'Bayon, sans-serif' }}
                        >
                            BACK TO HOME
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ORIGINAL CODE - UNCOMMENT WHEN BRACKETS OPEN
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
*/
