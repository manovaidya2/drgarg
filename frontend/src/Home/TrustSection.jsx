import React from "react";

const features = [
  {
    title: "Monthly Progress Tracker",
    desc: "Measurable changes in response, behaviour, engagement, sleep, and emotional state.",
  },
  {
    title: "Deep Assessment",
    desc: "Brain, gut, sensory, sleep, learning, and parent-child interaction reviewed together.",
  },
  {
    title: "Parent Guidance",
    desc: "Practical daily-life routines and structured behavioural support — not just instructions.",
  },
];

export default function TrustSection() {
  return (
    <section className="w-full bg-[#f8f3ea] py-10    md:py-12">
      
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-5 md:px-10 lg:px-10">
        
        {/* TEXT */}
        <div className="w-full max-w-[900px]">
          <p className="text-[#d98923] text-[11px] uppercase tracking-[0.32em] font-medium mb-3">
            Why Parents Trust Manovaidya
          </p>

          <h2 className="font-serif text-[#002b18] text-[28px] md:text-[32px] leading-[1.2] font-normal mb-4">
            Clarity, Direction & a Structured
            <br />
            System — Not Random Treatment
          </h2>

          <p className="text-[#33423d] text-[15px] md:text-[16px] leading-[1.6]">
            At Manovaidya, the child is not judged only by symptoms. The team studies
            brain response, gut condition, behaviour patterns, sensory processing,
            sleep, food habits, speech, parent-child interaction, and emotional
            regulation.
          </p>
        </div>

        {/* CARDS FULL WIDTH */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[14px] border border-[#ddd8cf] shadow-[0_4px_14px_rgba(0,0,0,0.025)] px-5 py-5 min-h-[140px]"
            >
              <h3 className="font-serif text-[#002b18] text-[16px] mb-2">
                {item.title}
              </h3>

              <p className="text-[#33423d] text-[14px] leading-[1.6]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* QUOTE */}
        <p className="mt-7 text-[#5a6762] text-[14px] italic max-w-[800px]">
          “Trust is not built by words. Trust is built when parents start seeing change.”
        </p>
      </div>
    </section>
  );
}