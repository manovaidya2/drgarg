import React from "react";
import { Link } from "react-router-dom";

const reframingCards = [
  {
    title: "Brain nourishment",
    desc: "Support for memory, clarity, and long-term cognitive health.",
  },
  {
    title: "Nervous system calming",
    desc: "Reducing anxiety, restlessness, and internal stress.",
  },
  {
    title: "Gut and metabolism support",
    desc: "Improving digestion, energy levels, and overall balance.",
  },
  {
    title: "Sleep correction",
    desc: "Restoring deep, natural sleep and daily recovery.",
  },
  {
    title: "Emotional support",
    desc: "Addressing loneliness, low mood, and emotional security.",
  },
  {
    title: "Lifestyle rhythm",
    desc: "Creating a stable daily routine for body and mind.",
  },
  {
    title: "Ayurvedic rejuvenation",
    desc: "Gentle, root-cause healing for long-term well-being.",
  },
];

export default function ReframingSection() {
  return (
    <section className="w-full bg-[#f8f4ed] px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Top */}
        <div className="mb-8 sm:mb-10">
          <p className="text-[#d99b2f] uppercase tracking-[0.35em] text-[11px] sm:text-[12px] font-medium mb-3">
            Approach
          </p>

          <h2 className="font-serif text-[#073821] text-[26px] sm:text-[34px] md:text-[38px] lg:text-[40px] leading-[1.15] tracking-[-0.03em]">
            A Calm, Restorative Treatment Pathway
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

        {/* Bottom Note */}
        <p className="mt-6 text-[14px] sm:text-[15px] text-[#5f6f73] max-w-[800px]">
          See our writing on{" "}
          <Link
            to="/brain-nourishment"
            className="text-[#003b27] underline underline-offset-[3px]"
          >
            brain nourishment
          </Link>{" "}
          for more on supporting cognitive health in later years.
        </p>

      </div>
    </section>
  );
}