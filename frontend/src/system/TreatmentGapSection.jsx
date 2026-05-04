import React from "react";

const gapItems = [
  {
    title: "Therapy",
    desc: "focuses on external behaviour.",
  },
  {
    title: "Counselling",
    desc: "focuses on thoughts and emotions.",
  },
  {
    title: "Medicine",
    desc: "may control symptoms.",
  },
  {
    title: "Diet",
    desc: "may improve digestion.",
  },
  {
    title: "Lifestyle",
    desc: "may support energy.",
  },
];

export default function TreatmentGapSection() {
  return (
    <section className="w-full bg-[#f7f1e8] py-6 md:py-8">
      <div className="max-w- mx-auto px-4 md:px-15">
        
        {/* LABEL */}
        <p className="text-[#d98923] text-[13px] uppercase tracking-[0.35em] mb-4">
          The Gap
        </p>

        {/* HEADING */}
        <h2 className="font-serif text-[#002b18] text-[26px] sm:text-[30px] md:text-[32px] leading-[1.15] tracking-[-0.02em] max-w-[820px]">
          Why Traditional Treatment Often Feels Incomplete
        </h2>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 mt-8 max-w-[900px]">
          {gapItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[10px] border border-[#e2ddd3] bg-white px-4 py-4 min-h-[90px]"
            >
              <h3 className="font-serif text-[#002b18] text-[16px] mb-1">
                {item.title}
              </h3>

              <p className="text-[#4b5b55] text-[14px] leading-[1.4]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM TEXT */}
        <p className="mt-6 max-w-[820px] text-[#2f3f4a] text-[15px] leading-[1.55]">
          But if all these are not connected into{" "}
          <strong>one structured system</strong>, the patient may not get stable
          long-term improvement.
        </p>

      </div>
    </section>
  );
}