import React from "react";

const approachCards = [
  {
    label: "Internal Treatment",
    title: "The Inner Layer",
    desc: "Works on brain nourishment, gut repair, nervous system regulation, hormonal balance, and internal stability.",
  },
  {
    label: "External Treatment",
    title: "The Outer Layer",
    desc: "Works on behaviour, communication, routine, emotional response, parent guidance, lifestyle, and practical functioning.",
  },
];

export default function TreatmentApproachSection() {
  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="max-w-[1380px] mx-auto px-4 md:px-[44px]">

        {/* LABEL */}
        <p className="text-[#d98923] text-[12px] uppercase tracking-[0.38em] mb-4">
          The Approach
        </p>

        {/* HEADING */}
        <h2 className="font-serif text-[#002b18] text-[28px] sm:text-[34px] md:text-[36px] leading-[1.15] tracking-[-0.03em]">
          Internal + External Treatment Model
        </h2>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {approachCards.map((item) => (
            <div
              key={item.title}
              className="rounded-[14px] border border-[#e2ddd3] bg-white px-6 py-6 min-h-[190px] shadow-[0_6px_18px_rgba(0,0,0,0.02)]"
            >
              <p className="text-[#d98923] text-[11px] uppercase tracking-[0.4em] mb-4">
                {item.label}
              </p>

              <h3 className="font-serif text-[#002b18] text-[22px] mb-3">
                {item.title}
              </h3>

              <p className="text-[#4b5b55] text-[15px] leading-[1.5] max-w-[520px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}