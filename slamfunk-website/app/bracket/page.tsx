"use client";

import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import { FaBasketballBall } from "react-icons/fa";
import { getSession } from 'next-auth/react';
import { Bracket } from 'app/api/bracket/route';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const App: React.FC = () => {
    const [brackets, setBrackets] = useState<Bracket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {

        const fetchBrackets = async() => {
            const session = await getSession();
            const userId = session?.user?.id;
            console.log("Fetching brackets for user:", userId);
            if (!userId) { setLoading(false); setUserId(null); return; }
            setUserId(userId);
            const res = await fetch(`/api/bracket/${userId}`)
            console.log("Fetch response status:", res.status);
            if (res.ok) {
                const data = await res.json();
                console.log("Brackets received:", data);
                setBrackets(data);
            } else {
                console.log("No brackets found or error occurred");
                const errorData = await res.json();
                console.log("Error data:", errorData);
            }
            setLoading(false);
        }

        fetchBrackets();

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
                    <h1 className='mt-8 text-4xl font-bold text-white' style={{ fontFamily: 'Bayon, sans-serif' }}>View Submissions</h1>
                    <h4 className='text-white text-lg' style={{ fontFamily: 'Bayon, sans-serif' }}>
                    View your bracket submissions (bracket editing is now closed)
                    </h4>
                    <div className='my-4 h-full flex flex-col gap-y-2'>
                        {brackets.map((bracket: Bracket) => (
                            <div key={bracket.id} className='dark:bg-gray-600 px-4 py-2 bg-gray-100 rounded-lg flex items-center justify-between'>
                                <div className='flex gap-x-2 items-center'>
                                    <div className='w-8 aspect-square rounded-full bg-black text-white grid place-items-center'>
                                        <FaBasketballBall />
                                    </div>
                                    <span className='text-lg font-bold' style={{ fontFamily: 'Bayon, sans-serif' }}>Bracket {bracket.id.slice(0, 5)}</span>
                                </div>
                                <div className='flex gap-x-2 items-center'>
                                    <a
                                        href={`/bracket/${bracket.id}`}
                                        className='px-4 py-2 bg-blue-200 text-blue-900 rounded-lg font-bold'
                                        style={{ fontFamily: 'Bayon, sans-serif' }}
                                    >
                                        View
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
