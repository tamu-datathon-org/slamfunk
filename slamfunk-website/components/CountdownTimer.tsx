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

  return (
    <div className="flex justify-center mb-12">
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <div className="text-3xl font-bold text-orange-500">{formatTime(days)}</div>
          <div className="text-xs uppercase text-gray-600 dark:text-gray-400">Days</div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <div className="text-3xl font-bold text-maroon-700">{formatTime(hours)}</div>
          <div className="text-xs uppercase text-gray-600 dark:text-gray-400">Hours</div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <div className="text-3xl font-bold text-orange-500">{formatTime(minutes)}</div>
          <div className="text-xs uppercase text-gray-600 dark:text-gray-400">Minutes</div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <div className="text-3xl font-bold text-maroon-700">{formatTime(seconds)}</div>
          <div className="text-xs uppercase text-gray-600 dark:text-gray-400">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;