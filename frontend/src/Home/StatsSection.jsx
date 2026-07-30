import React, { useEffect, useState } from "react";

const stats = [
  { value: "7+", end: 7, suffix: "+", label: "Years of Focused Experience" },
  { value: "5", end: 5, suffix: "", label: "Pillar Development System" },
  { end: null, value: "PhD", label: "Gut-Brain Axis Research" },
];

export default function StatsSection() {
  const [animatedCounts, setAnimatedCounts] = useState(null);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);

      setAnimatedCounts(
        stats.map((item) => {
          if (item.end === null) return item.value;
          return Math.floor(item.end * progress);
        })
      );

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="w-full bg-[#fbfcfc] border-t border-b border-[#e8ece9]">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {stats.map((item, index) => (
          <div
            key={index}
            className="min-h-[110px] flex flex-col items-center justify-center text-center px-3 py-4 border-b lg:border-b-0 border-[#e4e9e5] lg:border-r last:border-r-0"
          >
            {/* NUMBER */}
            <h3 className="relative min-h-[30px] font-serif text-[#002b18] text-[26px] md:text-[30px] leading-none">
              <span>{item.value}</span>
              {animatedCounts && item.end !== null && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#fbfcfc]"
                >
                  {`${animatedCounts[index].toLocaleString()}${item.suffix}`}
                </span>
              )}
            </h3>

            {/* LABEL */}
            <p className="mt-2 text-[#1f2f2a] text-[11px] md:text-[12px] uppercase tracking-[0.22em] font-medium leading-tight">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
