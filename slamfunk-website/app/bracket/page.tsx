"use client";

import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import { FaBasketballBall } from "react-icons/fa";
import { getSession } from 'next-auth/react';
import { Bracket } from 'app/api/bracket/route';
import { useRouter } from 'next/navigation';

const App: React.FC = () => {
    const [brackets, setBrackets] = useState<Bracket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {

        const fetchBrackets = async() => {
            const session = await getSession();
            const userId = session?.user?.id;
            if (!userId) { router.push('/login'); }
            const res = await fetch(`/api/bracket/${userId}`)
            if (res.ok) {
                const data = await res.json();
                setBrackets(data);
            }
            setLoading(false);
        }

        fetchBrackets();

    }, [])

    if (loading) { return <></>; }

    const handleDeleteBracket = async (bid: string) => {
        const res = await fetch(`/api/bracket/delete/${bid}`, { method: 'DELETE' });
        if (res.ok) {
            setBrackets(brackets.filter(bracket => bracket.id !== bid));
        } else {
            console.error('Error deleting bracket');
            router.push('/error?error=error deleting bracket');
        }
    }

    return (
        <div className='flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900'>
            <Header/>
            <div className='w-full p-4 md:p-6 lg:p-8'>
                <h1 className='mt-8 text-4xl font-bold'>View Submissions</h1>
                <h4 className='text-gray-600 text-lg'>
                You can view your brackets but changes won't be implemented!
                </h4>
                <div className='my-4 h-full flex flex-col gap-y-2'>
                    {brackets.map((bracket: Bracket) => (
                        <div key={bracket.id} className='dark:bg-gray-600 px-4 py-2 bg-gray-100 rounded-lg flex items-center justify-between'>
                            <div className='flex gap-x-2 items-center'>
                                <div className='w-8 aspect-square rounded-full bg-black text-white grid place-items-center'>
                                    <FaBasketballBall />
                                </div>
                                <span className='text-lg font-bold'>Bracket {bracket.id.slice(0, 5)}</span>
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <a
                                    href={`/bracket/${bracket.id}`}
                                    className='px-4 py-2 bg-blue-200 text-blue-900 rounded-lg'
                                >
                                    View
                                </a>
                                <button
                                    onClick={() => handleDeleteBracket(bracket.id)}
                                    type="button"
                                    className='px-4 py-2 bg-red-200 text-red-900 rounded-lg'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {(brackets.length < 5) ?
                <a
                    href='/bracket/new'
                    className='px-4 py-2 bg-black text-white rounded-lg'
                >
                    New Bracket
                </a>
                : <></> }

            </div>
        </div>
    );
};

export default App;
