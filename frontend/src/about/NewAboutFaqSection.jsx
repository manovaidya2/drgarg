import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Who Is Dr Ankush Garg?",
    a: "Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and developer of the Neuro-Ayurveda Development System. He has 7+ years of focused experience in child development and mental wellness. His ongoing PhD research explores the relationship between the gut–brain axis, behaviour and emotional wellbeing.",
  },
  {
    q: "What Areas Does Dr Ankush Garg Specialize In?",
    a: "Dr Ankush Garg works across multiple areas of development and mental wellness, including Autism Spectrum Disorder (ASD), ADHD, child development, behavioural concerns, emotional regulation, teen mental wellness, adult mental health and mind-body health concerns. His work focuses on understanding the broader factors that may influence learning, behaviour, emotional wellbeing and long-term development.",
  },
  {
    q: "What Is The Neuro-Ayurveda Development System?",
    a: "The Neuro-Ayurveda Development System is a structured framework developed by Dr Ankush Garg to better understand the interconnected factors that may influence development, behaviour and emotional wellbeing. The framework focuses on five key areas: Brain Nourishment System, Gut Response System, Neural Network System, Sensory Integration System and Behaviour Guidance System. Together, these areas help create a more comprehensive understanding of an individual's developmental and wellbeing needs.",
  },
  {
    q: "Does Dr Ankush Garg Work Only With Children?",
    a: "No. While child development is one of his primary areas of focus, Dr Ankush Garg also works with teenagers, adults, women and seniors. His work includes developmental concerns, behavioural challenges, emotional wellbeing, stress-related concerns, mind-body health issues and long-term wellness support for individuals and families across different stages of life.",
  },
  {
    q: "What Makes Dr Ankush Garg's Approach Different?",
    a: "Dr Ankush Garg's approach focuses on understanding the broader factors that may influence development, behaviour and emotional wellbeing rather than viewing concerns only through symptoms. Through the Neuro-Ayurveda Development System, attention is given to multiple interconnected areas including brain health, sensory processing, behaviour, lifestyle influences and overall wellbeing, helping families gain a clearer understanding of their concerns.",
  },
  {
    q: "Who Can Benefit From A Consultation?",
    a: "Consultations may be beneficial for parents concerned about their child's development, behaviour, learning, attention, communication or emotional wellbeing. They may also be helpful for teenagers and adults seeking guidance regarding stress, emotional wellbeing, lifestyle-related concerns or mind-body health challenges. The goal is to better understand the factors influencing the concern and identify appropriate next steps.",
  },
  {
    q: "How Can Families Get Started?",
    a: "Families can begin with a structured assessment and consultation session. During this process, concerns, developmental history, behavioural patterns, emotional wellbeing and relevant factors are reviewed to gain a better understanding of the individual's needs. Based on this assessment, personalized guidance and recommendations may be provided.",
  },
  {
    q: "Why Do Families Choose Dr Ankush Garg?",
    a: "Families often seek guidance from Dr Ankush Garg because of his structured, educational and holistic approach to development and wellbeing. His work combines assessment, parent education, long-term guidance and the Neuro-Ayurveda Development System to help families better understand challenges and make informed decisions regarding growth, learning and wellbeing.",
  },
];

export default function NewAboutFaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white px-5 py-8 sm:px-8 lg:px-40">
      <div>
        <div className="mb-8 text-center">
          <h2 className="font-serif text-[28px] font-semibold text-[#075640]">
            Frequently Asked Questions
          </h2>
          <span className="mx-auto mt-3 block h-px w-24 bg-[#075640]" />
        </div>

        <div className="overflow-hidden rounded-[8px] border border-[#e5e2d9] bg-white shadow-[0_12px_30px_rgba(5,54,39,0.05)]">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.q} className="border-b border-[#e5e2d9] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[16px] font-bold text-[#273931]"
                >
                  {faq.q}
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#273931] transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-[14px] font-medium leading-[1.75] text-[#4d5c55]">
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
