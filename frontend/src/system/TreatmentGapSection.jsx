import React from "react";

const gapItems = [
  {
    title: "Symptom-Only Understanding",
    desc: "The focus remains only on behaviour, attention, anxiety or speech, without looking at the wider developmental and wellbeing picture.",
  },
  {
    title: "Fragmented Guidance",
    desc: "Parents may receive different advice from different sources, but no clear roadmap.",
  },
  {
    title: "Lack Of Personalization",
    desc: "Every child and individual is different. A general approach may not address specific needs.",
  },
  {
    title: "Limited Family Guidance",
    desc: "Families often need practical understanding, not only technical explanations.",
  },
  {
    title: "Short-Term Focus",
    desc: "Many concerns require long-term developmental and emotional support, not quick assumptions.",
  },
];

export default function TreatmentGapSection() {
  return (
    <section className="w-full bg-[#f7f1e8] py-6 md:py-8">
      <div className="mx-auto px-4 md:px-10">
        <p className="mb-4 text-[13px] uppercase tracking-[0.35em] text-[#d98923]">
          Problems In Common Approaches
        </p>

        <h2 className="max-w-[900px] font-serif text-[26px] leading-[1.15] tracking-[-0.02em] text-[#002b18] sm:text-[30px] md:text-[32px]">
          Why Families Often Feel Confused
        </h2>

        <p className="mt-5 max-w-[900px] text-[15px] leading-[1.65] text-[#2f3f4a]">
          Many families feel confused because they are often told only what the
          diagnosis is, but not why the child or individual may be struggling in
          daily life.
        </p>

        <div className="mt-8 grid max-w-[980px] grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
          {gapItems.map((item) => (
            <div
              key={item.title}
              className="min-h-[112px] rounded-[10px] border border-[#e2ddd3] bg-white px-4 py-4"
            >
              <h3 className="mb-1 font-serif text-[16px] text-[#002b18]">
                {item.title}
              </h3>

              <p className="text-[14px] leading-[1.5] text-[#4b5b55]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-[900px] text-[15px] leading-[1.55] text-[#2f3f4a]">
          The Neuro-Ayurveda Development System&trade; aims to create a more
          structured and personalized understanding.
        </p>
      </div>
    </section>
  );
}
