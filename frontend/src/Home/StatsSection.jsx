import React, { useEffect, useState } from "react";

const stats = [
  { end: 7, suffix: "+", label: "Years Focused Experience" },
  { end: 10000, suffix: "s", label: "Patients Guided" },
  { end: 5, suffix: "", label: "Pillar Treatment System" },
  { end: null, value: "PhD", label: "Gut-Brain Axis Research" },
];

export default function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);

      setCounts(
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
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="min-h-[110px] flex flex-col items-center justify-center text-center px-3 py-4 border-b lg:border-b-0 border-[#e4e9e5] lg:border-r last:border-r-0"
          >
            {/* NUMBER */}
            <h3 className="font-serif text-[#002b18] text-[26px] md:text-[30px] leading-none">
              {item.end === null
                ? item.value
                : `${counts[index].toLocaleString()}${item.suffix}`}
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