import React from "react";

const reframingCards = [
  {
    title: "Anxiety is not just fear.",
    desc: "It is nervous system overload.",
  },
  {
    title: "Depression is not just sadness.",
    desc: "It involves energy, brain chemistry, gut health, sleep, hormones, and emotional suppression.",
  },
  {
    title: "Overthinking is not intelligence.",
    desc: "It is a repetitive brain loop.",
  },
  {
    title: "Sleep disturbance is not just routine failure.",
    desc: "It is a sign of an overactive mind and nervous system.",
  },
];

export default function ReframingSection() {
  return (
    <section className="w-full bg-[#f8f4ed] px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Top */}
        <div className="mb-8 sm:mb-10">
          <p className="text-[#d99b2f] uppercase tracking-[0.35em] text-[11px] sm:text-[12px] font-medium mb-3">
            Reframing
          </p>

          <h2 className="font-serif text-[#073821] text-[26px] sm:text-[34px] md:text-[38px] lg:text-[40px] leading-[1.15] tracking-[-0.03em]">
            What Modern Treatment Often Misses
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
          {reframingCards.map((item, index) => (
            <div
              key={index}
              className="rounded-[14px] border border-[#dedbd4] bg-white px-5 sm:px-6 py-5 sm:py-6 shadow-[0_6px_18px_rgba(36,30,20,0.04)]"
            >
              <h3 className="font-serif text-[#073821] text-[17px] sm:text-[18px] leading-[1.35]">
                {item.title}
              </h3>

              <p className="mt-2 text-[#263b3d] text-[14px] sm:text-[15px] leading-[1.5]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}