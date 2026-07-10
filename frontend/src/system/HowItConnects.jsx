import React from "react";
import { CheckCircle2 } from "lucide-react";
import diagramImg from "../images/brain-gut-axis.jpg";

const benefitItems = [
  "Autism",
  "ADHD",
  "Developmental concerns",
  "Speech and communication issues",
  "Learning challenges",
  "Difficult behaviors",
  "Challenges with emotional regulation",
  "Concern for emotional wellbeing in adolescents",
  "Anxiety and stress in adults",
  "Mind-body health issues",
];

export default function HowItConnects() {
  return (
    <section className="w-full bg-[#fbfaf6] py-12 md:py-16">
      <div className="mx-auto px-4 sm:px-6 md:px-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf6ef] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#075640]">
          Who Can Benefit
        </div>

        <h2 className="mb-5 max-w-[900px] font-serif text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#075640] sm:text-[30px] md:text-[34px]">
          Who Can Benefit From This Framework?
        </h2>

        <p className="mb-10 max-w-[840px] text-[15px] font-medium leading-[1.8] text-[#45544e]">
          Individuals and families seeking to better understand the following
          may find this framework useful:
        </p>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-14">
          <div className="relative mx-auto w-full max-w-[440px] min-w-0">
            <div className="absolute -left-6 -top-6 hidden h-40 w-40 rounded-full bg-[#e3ecdf] sm:block" />
            <div className="relative overflow-hidden rounded-[18px] bg-[#123f2a] shadow-[0_18px_40px_rgba(5,54,39,0.16)]">
              <img
                src={diagramImg}
                alt="Brain gut behaviour connection"
                className="h-[240px] w-full object-cover sm:h-[360px] md:h-[400px]"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {benefitItems.map((item) => (
              <div
                key={item}
                className="flex min-w-0 items-center gap-3 rounded-[12px] border border-[#e5e2d9] bg-white px-4 py-4 shadow-sm sm:px-5"
              >
                <CheckCircle2 size={18} className="shrink-0 text-[#075640]" />
                <p className="min-w-0 text-[14.5px] font-semibold leading-snug text-[#273931]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-[840px] text-[15px] font-medium leading-[1.8] text-[#45544e]">
          This framework offers the opportunity for understanding, combined with
          some degree of flexibility.
        </p>
      </div>
    </section>
  );
}
