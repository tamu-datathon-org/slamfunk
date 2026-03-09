"use client";
import React, { useState, useEffect } from 'react';

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

  const renderTimeUnit = (value, label) => {
    const characters = formatTime(value).toString().split('');

    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {characters.map((char, index) => (
            <div
              key={index}
              className="bg-white text-[#1e3a5f] px-6 py-4 text-5xl sm:text-6xl md:text-7xl shadow-xl border-2 border-gray-200"
              style={{
                fontFamily: 'Bayon, sans-serif',
                fontWeight: 'normal'
              }}
            >
              {char}
            </div>
          ))}
        </div>
        <span className="text-lg sm:text-xl md:text-2xl uppercase font-bold text-white tracking-widest">
          {label}
        </span>
      </div>
    );
  };

  const renderColon = () => (
    <div className="flex flex-col items-center justify-center mx-2 mb-12">
      <span className="text-5xl sm:text-6xl md:text-7xl text-white font-bold">:</span>
    </div>
  );

  return (
    <div className="flex justify-center mb-8 overflow-x-auto px-4">
      <div className="flex items-start gap-2 sm:gap-4">
        {renderTimeUnit(days, 'DAYS')}
        {renderColon()}
        {renderTimeUnit(hours, 'HOURS')}
        {renderColon()}
        {renderTimeUnit(minutes, 'MINUTES')}
        {renderColon()}
        {renderTimeUnit(seconds, 'SECONDS')}
      </div>
    </div>
  );
};

export default CountdownTimer;
