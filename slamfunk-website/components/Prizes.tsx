"use client";
import React from 'react';
import Image from 'next/image';

export default function Prizes() {
    const prizes = [
        {
            image: "/jersey.png",
            name: "Texas A&M Football Jersey",
            description: "Let's go Aggies! - Micheal Jordan",
            position: "1st Place - Best Bracket"
        },
        {
            image: "/dot_nobackground.png",
            name: "Amazon Echo Dot",
            description: "Will always be there to greet you when you come home. ",
            position: "1st Place - Data Science Write-Up"
        },
        {
            image: "/mouse_p.png",
            name: "LogiTech G502 Gaming Mouse",
            description: "You can't blame bad aim on your mouse any more.",
            position: "Runner-Up Prizes"
        }
    ];

    return (
        <section className="mx-4 sm:mx-8 lg:mx-auto max-w-7xl px-4 py-16 rounded-lg">
            <div className="relative flex justify-center mb-6">
                <Image
                    src="/PRIZES.svg"
                    alt="Prizes"
                    width={200}
                    height={100}
                    className="h-auto"
                />
            </div>
            <p className="relative py-4 text-center text-2xl text-white uppercase">
                Winners are able to choose from any of the following...
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {prizes.map((prize, index) => (
                    <div
                        key={index}
                        className="border-4 border-[#F45206] outline outline-4 outline-[#051231] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
                    >
                        <div className="h-64 w-full relative rounded-md overflow-hidden mb-4">
                            <Image
                                src={prize.image}
                                alt={prize.name}
                                fill
                                style={{ objectFit: 'contain' }}
                                className="p-6"
                            />
                        </div>

                        {/* <div className="bg-blue-500 text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-3">
                            {prize.position}
                        </div> */}

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {prize.name}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 font-light">
                            {prize.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}




