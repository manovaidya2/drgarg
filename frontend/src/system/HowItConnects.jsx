import React from "react";
import diagramImg from "../images/brain-gut-axis.jpg";

const connectItems = [
  {
    title: "Gut → Brain → Behaviour",
    desc: "Gut imbalance disturbs neural signalling, affecting attention, mood, and behaviour.",
  },
  {
    title: "Brain → Nervous System → Emotion",
    desc: "Brain regulation calms the nervous system, restoring emotional stability.",
  },
  {
    title: "Internal Biology → External Behaviour",
    desc: "Internal stability is what makes therapy and external interventions truly work.",
  },
];

export default function HowItConnects() {
  return (
    <section className="w-full bg-white py-10 md:py-12">

      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-10">

        {/* HEADER */}
        <p className="text-[#d98923] text-[11px] uppercase tracking-[0.4em] mb-4">
          Diagram
        </p>

        <h2 className="font-serif text-[#002b18] text-[28px] sm:text-[32px] md:text-[34px] leading-[1.15] tracking-[-0.03em] mb-10 max-w-[900px]">
          How It All Connects
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* IMAGE */}
          <div className="rounded-[18px] overflow-hidden bg-[#123f2a] shadow-md">
            <img
              src={diagramImg}
              alt="Gut brain connection diagram"
              className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover"
            />
          </div>

          {/* TEXT CARDS */}
          <div className="space-y-4">
            {connectItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[14px] border border-[#e2ddd3] bg-white px-5 py-5 shadow-sm"
              >
                <h3 className="font-serif text-[#002b18] text-[16px] mb-2">
                  {item.title}
                </h3>

                <p className="text-[#4b5b55] text-[14px] leading-[1.6]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}