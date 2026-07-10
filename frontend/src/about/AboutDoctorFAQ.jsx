import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Dr. Ankush Garg's educational background?",
    a: "Dr. Ankush Garg is an Ayurvedacharya with formal education and clinical training in Ayurveda. His work focuses on child development, mental wellness, behavioural concerns and mind-body wellbeing.",
  },
  {
    q: "What areas has Dr. Ankush Garg worked in?",
    a: "His work includes Autism, ADHD, child development concerns, behavioural challenges, emotional regulation, teen mental wellness, adult stress and mind-body health concerns.",
  },
  {
    q: "Are certificates and trainings listed on this page verified?",
    a: "Yes. Only genuine and verified certifications, trainings, workshops and professional credentials should be listed on this page.",
  },
  {
    q: "Why is professional background important?",
    a: "Professional background helps families understand the education, experience and training behind the guidance they receive.",
  },
  {
    q: "Does Dr. Ankush Garg conduct educational awareness work?",
    a: "Yes. His work includes parent education, awareness content and guidance around child development, emotional wellbeing and mental wellness.",
  },
];

export default function AboutDoctorFAQ() {
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
