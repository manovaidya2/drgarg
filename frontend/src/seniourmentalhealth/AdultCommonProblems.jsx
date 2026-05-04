import React from "react";

const problems = [
  "Memory issues",
  "Poor sleep",
  "Anxiety",
  "Loneliness",
  "Low mood",
  "Brain fog",
  "Cognitive decline",
  "Irritability",
  "Fatigue",
  "Emotional insecurity",
  "Fearfulness",
];

export default function AdultCommonProblems() {
  return (
    <section className="w-full bg-[#fbfaf7] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mx-auto ">
        
        {/* Label */}
        <p className="text-[#d99b2f] uppercase tracking-[0.35em] text-[11px] sm:text-[12px] font-medium mb-4">
          What We Address
        </p>

        {/* Heading */}
        <h2 className="font-serif text-[#073821] text-[26px] sm:text-[34px] md:text-[40px] lg:text-[42px] leading-[1.15] tracking-[-0.03em] max-w-[900px]">
          Common Senior Concerns
        </h2>

        {/* Pills */}
        <div className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
          {problems.map((item, index) => (
            <span
              key={index}
              className="inline-flex h-[38px] items-center justify-center rounded-full border border-[#dedbd4] bg-white px-4 text-[14px] text-[#102b2d]"
            >
              {item}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}