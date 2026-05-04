import React from "react";

const roadmap = [
  {
    phase: "Phase 1",
    title: "Calmness & Sensory Stability",
    desc: "Reducing overload, regulating sleep, building baseline calm.",
  },
  {
    phase: "Phase 2",
    title: "Response & Engagement",
    desc: "Building attention, eye contact, name response, and connection.",
  },
  {
    phase: "Phase 3",
    title: "Communication & Behaviour",
    desc: "Speech attempts, behaviour stability, and structured routine.",
  },
  {
    phase: "Phase 4",
    title: "Functional Independence",
    desc: "Daily-life skills, learning ability, and sustained progress.",
  },
];

export default function DevelopmentRoadmap() {
  return (
    <section className="w-full bg-[#f7f1e8] py-8 md:py-10">
      <div className="w-full px-5 md:px-10">
        <p className="text-[#d98923] text-[12px] uppercase tracking-[0.42em] mb-4">
          Roadmap
        </p>

        <h2 className="font-serif text-[#002b18] text-[30px] sm:text-[34px] md:text-[36px] leading-[1.12] tracking-[-0.03em] mb-10">
          The 180-Day Development Roadmap
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roadmap.map((item) => (
            <div
              key={item.phase}
              className="rounded-[14px] border border-[#dedbd3] bg-white px-6 py-6 min-h-[154px] shadow-[0_8px_20px_rgba(0,0,0,0.03)]"
            >
              <p className="text-[#d98923] text-[12px] tracking-[0.38em] mb-4">
                {item.phase}
              </p>

              <h3 className="font-serif text-[#002b18] text-[17px] leading-snug mb-4">
                {item.title}
              </h3>

              <p className="text-[#2f3f4a] text-[15px] leading-[1.55]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}