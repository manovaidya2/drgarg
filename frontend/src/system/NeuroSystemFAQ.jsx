import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

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
    <section className="w-full bg-white px-4 py-12 sm:px-6 md:px-10 md:py-16">
      <div className="mx-0 md:mx-10">
        <div className="mb-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#e5e2d9] bg-[#fbfaf6] text-[#075640] shadow-sm">
            <HelpCircle size={26} strokeWidth={1.8} />
          </div>
          <h2 className="font-serif text-[24px] font-semibold leading-[1.2] text-[#075640] sm:text-[28px]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="min-w-0 divide-y divide-[#e5e2d9] rounded-[14px] border border-[#e5e2d9] bg-[#fbfaf6] px-3 shadow-[0_10px_28px_rgba(5,54,39,0.04)] sm:px-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full min-w-0 items-center justify-between gap-3 py-5 text-left text-[14px] font-bold leading-snug text-[#273931] sm:gap-4 sm:text-[15px]"
                >
                  {faq.q}
                  <ChevronDown
                    size={19}
                    className={`shrink-0 text-[#075640] transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-5 text-[14px] font-medium leading-[1.75] text-[#4c5b55]">
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
