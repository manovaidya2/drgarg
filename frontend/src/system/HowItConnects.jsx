import React from "react";
import diagramImg from "../images/brain-gut-axis.jpg";

const benefitItems = [
  "Autism",
  "ADHD",
  "Child development concerns",
  "Speech and communication challenges",
  "Learning difficulties",
  "Behavioural concerns",
  "Emotional regulation difficulties",
  "Teen emotional wellbeing",
  "Adult stress and anxiety",
  "Mind-body health concerns",
];

export default function HowItConnects() {
  return (
    <section className="w-full bg-white py-10 md:py-12">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-10">
        <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#d98923]">
          Who Can Benefit
        </p>

        <h2 className="mb-6 max-w-[900px] font-serif text-[28px] leading-[1.15] tracking-[-0.03em] text-[#002b18] sm:text-[32px] md:text-[34px]">
          Who Can Benefit From This Framework?
        </h2>

        <p className="mb-8 max-w-[900px] text-[15px] leading-[1.65] text-[#4b5b55]">
          This framework may be helpful for families and individuals seeking
          clarity around developmental, behavioural, emotional and mind-body
          wellbeing concerns. The system is designed to support understanding,
          direction and structured guidance.
        </p>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-[18px] bg-[#123f2a] shadow-md">
            <img
              src={diagramImg}
              alt="Brain gut behaviour connection"
              className="h-[320px] w-full object-cover sm:h-[380px] md:h-[420px]"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {benefitItems.map((item) => (
              <div
                key={item}
                className="rounded-[14px] border border-[#e2ddd3] bg-white px-5 py-4 shadow-sm"
              >
                <p className="font-serif text-[16px] text-[#002b18]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
