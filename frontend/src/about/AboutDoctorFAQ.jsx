import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

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
    <section className="w-full bg-white px-4 py-12 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
        <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#e5e2d9] bg-[#fbfaf6] text-[#075640] shadow-sm">
            <HelpCircle size={26} strokeWidth={1.8} />
          </div>
          <h2 className="font-serif text-[24px] font-semibold leading-[1.2] text-[#075640] sm:text-[28px] lg:mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-[#e5e2d9] rounded-[14px] border border-[#e5e2d9] bg-[#fbfaf6] px-2 shadow-[0_10px_28px_rgba(5,54,39,0.04)] sm:px-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-bold text-[#273931]"
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
