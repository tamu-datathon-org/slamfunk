"use client";
import Image from "next/image";


export default function Tracks(){
    return (
        <section id="competition-tracks" className="relative w-full overflow-hidden py-16">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center mb-12">
              <div className="mb-6">
                <Image
                  src="/competition_tracks.svg"
                  alt="Competition Tracks"
                  width={1000}
                  height={100}
                  className="w-full max-w-5xl h-auto"
                />
              </div>
              <h3
                className="text-white text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider"
                style={{ fontFamily: 'Bayon, sans-serif' }}
              >
                CHOOSE YOUR PATH TO VICTORY
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch mt-16">
              <div className="relative pt-16 flex">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-10">
                  <Image
                    src="/basketball1.svg"
                    alt="Basketball"
                    width={140}
                    height={140}
                    className="w-28 h-28 sm:w-32 sm:h-32"
                  />
                </div>
                <div className="bg-[#0f1e33] p-10 pt-16 rounded-3xl w-full flex flex-col justify-between">
                  <div className="text-white" style={{ fontFamily: 'Bayon, sans-serif' }}>
                    <h3 className="text-2xl sm:text-3xl text-center mb-8 uppercase">Best Bracket Track</h3>
                    <p className="text-xl sm:text-2xl mb-8">Test your basketball knowledge and prediction skills!</p>
                    <ul className="space-y-20">
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Submit up to 5 NCAA March Madness brackets</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Scoring follows the official NCAA bracket scoring system</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>The highest-scoring bracket wins, with a runner-up prize for second place</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white font-bold mt-8" style={{ fontFamily: 'Bayon, sans-serif' }}>Due: March 19th, 11:59 PM</p>
                </div>
              </div>
              <div className="relative pt-16 flex">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-10">
                  <Image
                    src="/lineup.svg"
                    alt="Data Science"
                    width={140}
                    height={140}
                    className="w-28 h-28 sm:w-32 sm:h-32"
                  />
                </div>
                <div className="bg-[#0f1e33] p-10 pt-16 rounded-3xl w-full flex flex-col justify-between">
                  <div className="text-white" style={{ fontFamily: 'Bayon, sans-serif' }}>
                    <h3 className="text-2xl sm:text-3xl text-center mb-8 uppercase">Best Data Science Write-Up Track</h3>
                    <p className="text-xl sm:text-2xl mb-8">Use your analytical skills to predict tournament outcomes!</p>
                    <ul className="space-y-5">
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Use data analytics, machine learning, or statistical modelcans for your predictions</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Submit a written analysis detailing methodology, insights, and predictions</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Submissions can be written or video format</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Must also submit at least one bracket</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Judged on creativity, accuracy, and clarity of explanation</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white font-bold mt-8" style={{ fontFamily: 'Bayon, sans-serif' }}>Due: April 3rd 11:59 PM (right before Final Four games)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
}