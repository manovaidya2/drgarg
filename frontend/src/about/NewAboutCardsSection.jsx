import React from "react";
import { Link } from "react-router-dom";
import { BookOpenCheck, Check, Heart, Leaf, UsersRound } from "lucide-react";

const cards = [
  {
    icon: BookOpenCheck,
    title: "Education & Training",
    items: [
      "BAMS (Bachelor of Ayurvedic Medicine and Surgery)",
   
      "MPH (Master of Public Health)",
      "Ph.D. (gut brain axis)",
    
     
      "Advanced certifications in Pain Management & Panchakarma",
      "Regularly updates knowledge through workshops, seminars and research.",
    ],
  },
  {
    icon: UsersRound,
    title: "Community Education",
    items: [
      "Conducts health talks and workshops",
      "Shares trusted health insights through digital platforms",
      "Works towards making Ayurveda simple, practical and accessible",
    ],
    intro:
      "Dr. Ankush Garg is passionate about spreading awareness and empowering individuals to take charge of their health.",
  },
  {
    icon: Heart,
    title: "Why Families Choose Dr. Ankush Garg",
    items: [
      "7+ Years of Focused Experience",
      "Personalized & compassionate care",
      "Root-cause approach",
      "Advanced Ayurvedic therapies",
      "Progress-focused guidance and patient satisfaction",
      "Guidance for long-term wellness",
    ],
    checks: true,
  },
];

export default function NewAboutCardsSection() {
  return (
    <section className="bg-white px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto ">
        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-[10px] border border-[#e3e4dc] bg-white p-7 shadow-sm">
                <div className="mb-5 flex items-center gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#edf6ef] text-[#075640]">
                    <Icon size={23} />
                  </div>
                  <h2 className="font-serif text-[22px] font-semibold text-[#075640]">
                    {card.title}
                  </h2>
                </div>
                {card.intro && (
                  <p className="mb-5 text-[14px] font-medium leading-[1.75] text-[#3f5049]">
                    {card.intro}
                  </p>
                )}
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[13px] font-medium leading-[1.65] text-[#3f5049]">
                      {card.checks ? (
                        <Check className="mt-1 shrink-0 text-[#075640]" size={15} />
                      ) : (
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#74a76e]" />
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-[14px] bg-[#edf5e9]">
          <div className="grid items-center gap-6 px-7 py-7 lg:grid-cols-[150px_1fr_auto] lg:px-10">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-white">
              <div className="absolute bottom-0 left-1/2 h-12 w-20 -translate-x-1/2 rounded-t-full bg-[#70472c]" />
              <Leaf className="absolute left-8 top-5 text-[#4f9b48]" size={76} strokeWidth={1.6} />
              <Leaf className="absolute right-8 top-9 rotate-45 text-[#6fb15f]" size={46} strokeWidth={1.7} />
            </div>
            <div>
              <h2 className="font-serif text-[25px] font-semibold text-[#075640]">
                Begin your journey towards natural healing.
              </h2>
              <p className="mt-2 max-w-[610px] text-[15px] font-medium leading-[1.75] text-[#40514a]">
                Book a personalized consultation and take the first step towards a
                pain-free, balanced life.
              </p>
            </div>
            <div className="text-center lg:text-left">
              <Link
                to="/appointment"
                className="inline-flex h-[50px] items-center justify-center gap-3 rounded-[5px] bg-[#075640] px-8 text-[12px] font-bold uppercase text-white transition hover:bg-[#064834]"
              >
                <UsersRound size={16} />
                Book A Consultation
              </Link>
              <p className="mt-3 text-[12px] font-bold text-[#4f6259]">
                In-Clinic &amp; Online Appointments Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
