"use client";
import Header from "components/Header"
import { useEffect, useState } from "react";
import { Bracket } from "app/api/bracket/route";
import { redirect, useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import MarchMadnessBracket from "components/MarchMadnessBracket";
import Image from "next/image";

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
                    <h1 className='mt-8 text-4xl font-bold text-white' style={{ fontFamily: 'Bayon, sans-serif' }}>Bracket</h1>
                    <h4 className='text-white text-lg' style={{ fontFamily: 'Bayon, sans-serif' }}>
                        You can view your brackets but changes won't be implemented!
                    </h4>
                    <MarchMadnessBracket
                        submissionId={bracket.id}
                        userID={userId!}
                        roundData={bracket}
                    />
                </div>
            </div>
        </div>

    )
}
