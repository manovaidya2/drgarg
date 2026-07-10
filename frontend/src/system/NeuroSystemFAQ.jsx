import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is the Neuro-Ayurveda Development System?",
    a: "The Neuro-Ayurveda Development System is a structured framework developed by Dr. Ankush Garg to understand the interconnected factors influencing development, behaviour and emotional wellbeing.",
  },
  {
    q: "Why was this system created?",
    a: "It was created because many developmental and emotional concerns cannot be fully understood through symptoms alone. The system helps families understand the broader factors behind concerns.",
  },
  {
    q: "What are the five pillars of the system?",
    a: "The five pillars are Brain Nourishment System, Gut Response System, Neural Network System, Sensory Integration System and Behaviour Guidance System.",
  },
  {
    q: "Is this system only for children?",
    a: "No. While it is especially useful in child development, autism, ADHD and behavioural concerns, the framework may also help understand teen, adult and mind-body wellbeing concerns.",
  },
  {
    q: "How is this different from a symptom-based approach?",
    a: "A symptom-based approach focuses mainly on what is visible. This system looks at the wider pattern, including brain, gut, sensory, behaviour, lifestyle and emotional factors.",
  },
  {
    q: "Does this replace medical diagnosis or therapy?",
    a: "No. This framework is for structured understanding and guidance. It does not replace professional medical diagnosis, emergency care or required therapy support.",
  },
  {
    q: "How can families start?",
    a: "Families can begin with a structured assessment session where developmental, behavioural, emotional and lifestyle-related factors are reviewed to understand the concern more clearly.",
  },
];

export default function NeuroSystemFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="w-full bg-[#f9faf7] px-4 py-10 sm:px-6 md:px-10">
      <div className="mx-auto">
        <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#d98923]">
          Frequently Asked Questions
        </p>

        <h2 className="mb-8 font-serif text-[28px] leading-[1.15] tracking-[-0.03em] text-[#002b18] sm:text-[32px] md:text-[34px]">
          Frequently Asked Questions
        </h2>

        <div className="overflow-hidden rounded-[12px] border border-[#e2ddd3] bg-white shadow-sm">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.q} className="border-b border-[#e2ddd3] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-serif text-[16px] text-[#002b18]"
                >
                  {faq.q}
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-[14px] leading-[1.7] text-[#4b5b55]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
