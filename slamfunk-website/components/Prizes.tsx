"use client";
import React from 'react';
import Image from 'next/image';

export default function Prizes() {
    const prizes = [
        {
            image: "/airfryer.jpg",
            name: "Ninja Air Fryer",
            description: "Got the eats? Get this air fryer!",
            position: "1st Place - Best Bracket"
        },
        {
            image: "/beats.avif",
            name: "Beats Headphones",
            description: "Dr. Dre personally handcrafted these headphones.",
            position: "1st Place - Data Science Write-Up"
        },
        {
            image: "/camera.jpg",
            name: "FujiFilm Instax",
            description: "Take some heater pics with this cam cam",
            position: "Runner-Up Prizes"
        }
    ];

    return (
        <section className="mx-4 sm:mx-8 lg:mx-auto max-w-7xl px-4 py-16 rounded-lg">
            <div className="mb-6 flex justify-center">
                <Image
                    src="/prize.svg"
                    alt="Prizes"
                    width={1000}
                    height={100}
                    className="w-full max-w-4xl h-auto"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {prizes.map((prize, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
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

                        <div className="bg-blue-500 text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-3">
                            {prize.position}
                        </div>

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




