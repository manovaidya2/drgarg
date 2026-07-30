import React from "react";

const carePoints = [
  {
    title: "Whole-Person Assessment",
    desc: "Each case is reviewed across development, behaviour, sleep, digestion, sensory responses, lifestyle and family routines.",
  },
  {
    title: "Research-Informed",
    desc: "His gut-brain axis research focus supports a broader understanding of development, behaviour and mental wellness.",
  },
  {
    title: "Structured Guidance",
    desc: "Families receive practical guidance, follow-up and education so they can understand concerns more clearly over time.",
  },
];

export default function DifferentStandardCare() {
  return (
    <section className="w-full bg-[#f7f1e8] py-6 md:py-8">
      <div className="mx-auto px-4 md:px-10">
        <p className="mb-3 text-[13px] uppercase tracking-[0.3em] text-[#d98923]">
          Why Families Seek His Guidance
        </p>

        <h2 className="max-w-[620px] font-serif text-[26px] leading-[1.15] tracking-[-0.02em] text-[#002b18] sm:text-[30px] md:text-[36px]">
          A Structured Standard of Care
          <br />
          for Development and Mental Wellness
        </h2>

        <p className="mt-4 max-w-[700px] text-[14px] leading-[1.6] text-[#2f3f4a] sm:text-[18px]">
          Dr. Ankush Garg looks at the brain, gut, nervous system, sensory
          processing, lifestyle and behaviour together. This integrated view
          shapes his work as an Ayurvedacharya focused on child development and
          mental wellness.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {carePoints.map((item) => (
            <div
              key={item.title}
              className="min-h-[170px] rounded-[4px] border border-[#ddd7ce] bg-white px-5 py-5 transition hover:shadow-sm"
            >
              <h3 className="mb-2 font-serif text-[20px] text-[#002b18]">
                {item.title}
              </h3>

              <p className="text-[16px] leading-[1.5] text-[#4b5b55]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
