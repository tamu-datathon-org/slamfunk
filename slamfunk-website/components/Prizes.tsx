import React from 'react';
import Image from 'next/image';
import { FaTrophy } from "react-icons/fa";

const Prizes = () => {
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
    <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 transition-colors duration-200 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaTrophy className="text-yellow-500 text-4xl mr-3" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
              Awesome Prizes
            </h2>
          </div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 font-light">
            Compete for these amazing prizes and showcase your prediction skills!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {prizes.map((prize, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 border-l-4 border-blue-500 hover:shadow-xl transform hover:-translate-y-2"
            >
              <div className="h-64 w-full bg-gray-50 dark:bg-gray-700 relative rounded-md overflow-hidden mb-4">
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
      </div>
    </section>
  );
};

export default Prizes;