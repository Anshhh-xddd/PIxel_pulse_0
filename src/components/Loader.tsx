import React, { useEffect, useState } from 'react';

const Loader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: number;
    if (progress < 100) {
      interval = window.setInterval(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 15, 100));
      }, 200);
    } else {
      window.setTimeout(() => onFinish(), 400);
    }
    return () => clearInterval(interval);
  }, [progress, onFinish]);

  return (
    <div className="fixed inset-0 z-[20000] flex flex-col items-center justify-center bg-black">
      {/* PIXEL PULSE Logo with pulse animation */}
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-orange-500 mb-12 animate-pulse tracking-widest">
        PIXEL<span className="text-white">PULSE</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-80 h-4 bg-gray-800 rounded-full overflow-hidden shadow-lg border border-gray-700">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-200 relative smooth-loading-bar"
          style={{ width: `${progress}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>
      
      {/* Progress percentage */}
      <div className="mt-6 text-gray-300 text-lg font-medium tracking-wider">
        {Math.round(progress)}%
      </div>

      {/* Loading indicator */}
      <div className="mt-8 flex space-x-2">
        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default Loader; 