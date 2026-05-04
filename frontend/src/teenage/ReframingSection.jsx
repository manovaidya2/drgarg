import React from "react";

const reframingCards = [
  {
    title: "Study pressure is not just academic stress.",
    desc: "It can become emotional overload.",
  },
  {
    title: "Late-night phone use is not just a habit.",
    desc: "It may disturb sleep, focus, and emotional stability.",
  },
  {
    title: "Sudden anger may not be attitude.",
    desc: "It may be emotional overload.",
  },
  {
    title: "A child who does not talk may not be disrespectful.",
    desc: "They may not feel safe enough to express.",
  },
];

export default function TeenageReframingSection() {
  return (
    <section className="w-full bg-[#f8f4ed] px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
      <div className=" mx-auto">
        
        {/* Top */}
        <div className="mb-8 sm:mb-10">
          <p className="text-[#d99b2f] uppercase tracking-[0.35em] text-[11px] sm:text-[12px] font-medium mb-3">
            Reframing
          </p>

          <h2 className="font-serif text-[#073821] text-[26px] sm:text-[34px] md:text-[38px] lg:text-[40px] leading-[1.15] tracking-[-0.03em]">
            What Parents Often Misread
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