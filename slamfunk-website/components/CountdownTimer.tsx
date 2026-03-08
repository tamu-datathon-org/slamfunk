"use client";
import React, { useState, useEffect } from 'react';
import { Special_Elite, Permanent_Marker, Bebas_Neue } from 'next/font/google';

const specialElite = Special_Elite({ weight: '400', subsets: ['latin'] });
const permanentMarker = Permanent_Marker({ weight: '400', subsets: ['latin'] });
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] });

const scrapbookStyles = [
  { bg: 'bg-orange-500', text: 'text-white', font: bebasNeue.className, rotate: '-rotate-2' },
  { bg: 'bg-[#500000]', text: 'text-white', font: permanentMarker.className, rotate: 'rotate-1' },
  { bg: 'bg-white', text: 'text-gray-900', font: specialElite.className, rotate: 'rotate-2' },
  { bg: 'bg-gray-800', text: 'text-orange-400', font: bebasNeue.className, rotate: '-rotate-1' },
  { bg: 'bg-[#f0ece1]', text: 'text-gray-900', font: permanentMarker.className, rotate: 'rotate-3' },
  { bg: 'bg-orange-600', text: 'text-white', font: specialElite.className, rotate: '-rotate-2' },
];

const CountdownTimer = ({ targetDate }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const renderTimeUnit = (value, label, startIndex) => {
    const characters = formatTime(value).toString().split('');

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          {characters.map((char, index) => {
            const styleIndex = (startIndex + index) % scrapbookStyles.length;
            const style = scrapbookStyles[styleIndex];

            return (
              <div
                key={index}
                className={`
                  ${style.bg} ${style.text} ${style.font} ${style.rotate}
                  px-4 py-2 text-4xl sm:text-5xl md:text-6xl shadow-lg
                `}
                style={{ clipPath: 'polygon(2% 3%, 98% 0%, 96% 98%, 0% 100%)' }}
              >
                {char}
              </div>
            );
          })}
        </div>
        <span className="text-sm uppercase font-bold text-gray-700 dark:text-gray-300 tracking-wider">
          {label}
        </span>
      </div>
    );
  };

  const renderColon = () => (
    <div
      className="flex flex-col items-center justify-center bg-white px-2 py-4 rotate-1 shadow-md mx-1 self-start mt-0"
      style={{ clipPath: 'polygon(10% 0%, 100% 5%, 90% 100%, 0% 95%)' }}
    >
      <div className="w-2 h-2 bg-gray-800 mb-2 rounded-sm"></div>
      <div className="w-2 h-2 bg-gray-800 mt-2 rounded-sm"></div>
    </div>
  );

  return (
    <div className="flex justify-center mb-12 overflow-x-auto">
      <div className="flex items-start gap-3 p-4">
        {renderTimeUnit(days, 'Days', 0)}
        {renderColon()}
        {renderTimeUnit(hours, 'Hours', 2)}
        {renderColon()}
        {renderTimeUnit(minutes, 'Minutes', 4)}
        {renderColon()}
        {renderTimeUnit(seconds, 'Seconds', 6)}
      </div>
    </div>
  );
};

export default CountdownTimer;
