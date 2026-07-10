import React from "react";
import { CheckCircle2, ClipboardList, GitBranch, UserCheck } from "lucide-react";

const cards = [
  {
    icon: ClipboardList,
    title: "How Assessment Works",
    intro:
      "The first main aim of the Neuro-Ayurveda Development System is the detailed understanding of the child. The evaluation consists of an analysis of the areas below.",
    items: [
      "Developmental history",
      "Behavioral patterns",
      "Emotional health",
      "Sleep and daily routines",
      "Food and digestion",
      "Sensory responses",
      "Learning and attention",
      "Family and lifestyle",
      "Existing problems and strengths",
    ],
  },
  {
    icon: GitBranch,
    title: "How This System Is Different",
    intro:
      "Neuro-Ayurveda Development System is unique because it integrates the child's developmental, behavioral, and emotional aspects.",
    items: [
      "Brain function",
      "Gut response",
      "Learning pathways",
      "Sensory processing",
      "Behavioral patterns",
      "Lifestyle factors",
      "Emotional aspects",
    ],
  },
  {
    icon: UserCheck,
    title: "Personalized For Every Concern",
    intro:
      "The system looks beyond the usual question of what the child's problem is and focuses on interrelated factors that may explain functioning more clearly.",
    items: [
      "Visible problems",
      "Related aspects of functioning",
      "Organized practical advice",
      "Guidance on further steps",
    ],
  },
];

export default function TreatmentApproachSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto px-4 md:px-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf6ef] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#075640]">
          How Assessment Works
        </div>

        <h2 className="mb-9 font-serif text-[24px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#075640] sm:text-[28px] md:text-[32px]">
          Understanding The Individual In Detail
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="min-w-0 rounded-[14px] border border-[#e5e2d9] bg-[#fbfaf6] p-5 shadow-[0_10px_26px_rgba(5,54,39,0.05)] sm:p-6"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-white text-[#075640] shadow-sm">
                  <Icon size={20} />
                </div>

                <h3 className="mb-2.5 text-[16.5px] font-bold leading-snug text-[#075640]">
                  {card.title}
                </h3>

                <p className="mb-4 text-[13.5px] leading-[1.65] text-[#5b6962]">
                  {card.intro}
                </p>

                <ul className="space-y-2.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex min-w-0 gap-2.5 text-[13.5px] font-semibold text-[#3f5049]">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#075640]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-8 max-w-[880px] text-[14.5px] font-medium leading-[1.8] text-[#45544e]">
          The goal of the evaluation is to understand the visible problems and
          related aspects of the child's functioning. Based on the understanding
          of these aspects, parents receive the opportunity to have organized
          practical advice and guidance on the further steps. Unlike other
          systems, this one focuses on the interrelated factors in addition to
          the answer to the typical question{" "}
          <span className="font-bold text-[#075640]">
            "What is the child's problem?"
          </span>{" "}
          The interrelated factors may provide clarity of the child's functioning
          to the parents and may provide more tailored guidance to the child.
        </p>
      </div>
    </section>
  );
}
