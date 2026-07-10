import React from "react";

const assessmentItems = [
  "Developmental history",
  "Behavioural patterns",
  "Emotional wellbeing",
  "Sleep and routine",
  "Food and digestion patterns",
  "Sensory responses",
  "Learning and attention",
  "Family and lifestyle factors",
  "Current challenges and strengths",
];

const differenceItems = [
  "Brain function",
  "Gut response",
  "Learning pathways",
  "Sensory processing",
  "Behavioural patterns",
  "Lifestyle influences",
  "Emotional wellbeing",
];

export default function TreatmentApproachSection() {
  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="mx-auto px-4 md:px-10">
        <p className="mb-4 text-[12px] uppercase tracking-[0.38em] text-[#d98923]">
          How Assessment Works
        </p>

        <h2 className="font-serif text-[28px] leading-[1.15] tracking-[-0.03em] text-[#002b18] sm:text-[34px] md:text-[36px]">
          Understanding The Individual In Detail
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="min-h-[190px] rounded-[14px] border border-[#e2ddd3] bg-white px-6 py-6 shadow-[0_6px_18px_rgba(0,0,0,0.02)]">
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#d98923]">
              Assessment May Include
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {assessmentItems.map((item) => (
                <p key={item} className="text-[14px] leading-[1.5] text-[#4b5b55]">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="min-h-[190px] rounded-[14px] border border-[#e2ddd3] bg-white px-6 py-6 shadow-[0_6px_18px_rgba(0,0,0,0.02)]">
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#d98923]">
              How This System Is Different
            </p>

            <p className="text-[15px] leading-[1.6] text-[#4b5b55]">
              The Neuro-Ayurveda Development System&trade; is different because
              it does not view development, behaviour and emotional wellbeing as
              separate issues. It connects:
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {differenceItems.map((item) => (
                <p key={item} className="text-[14px] leading-[1.5] text-[#4b5b55]">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-[920px] text-[15px] leading-[1.65] text-[#2f3f4a]">
          The purpose of assessment is not only to identify concerns, but to
          understand the broader pattern behind them. Instead of asking only,
          "What is the symptom?" the system asks, "What are the interconnected
          factors influencing this concern?"
        </p>
      </div>
    </section>
  );
}
