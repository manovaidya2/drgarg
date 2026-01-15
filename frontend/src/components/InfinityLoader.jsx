import React from "react";

export default function InfinityLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      
      {/* Loader */}
      <div className="relative w-[170px] h-[60px] flex items-center justify-center">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className={`
              absolute
              w-2.5 h-2.5 rounded-full
              ${i % 2 === 0 ? "bg-orange-500" : "bg-emerald-700"}
              animate-wave
            `}
            style={{
              left: `${i * 10}px`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>

      {/* Tailwind animation INSIDE same file */}
      <style>
        {`
          @keyframes wave {
            0%   { transform: translateY(0); opacity: .3; }
            25%  { transform: translateY(-18px); opacity: 1; }
            50%  { transform: translateY(0); opacity: .6; }
            75%  { transform: translateY(18px); opacity: 1; }
            100% { transform: translateY(0); opacity: .3; }
          }

          .animate-wave {
            animation: wave 1.6s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
