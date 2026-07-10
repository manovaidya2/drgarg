import React from "react";
import {
  Award,
  BriefcaseMedical,
  HeartHandshake,
  Megaphone,
  Newspaper,
  TrendingUp,
  UsersRound,
} from "lucide-react";

const sections = [
  {
    icon: BriefcaseMedical,
    title: "Clinical Experience",
    desc: "Working with children, teenagers, adults and families on developmental, behavioural and emotional concerns.",
    list: ["Autism & ADHD", "Behavioural challenges", "Emotional regulation"],
  },
  {
    icon: Award,
    title: "Certifications",
    desc: "Only verified certifications and formal professional credentials are listed here.",
    list: ["Ayurvedacharya qualification", "Child development training", "Ayurveda clinical training"],
  },
  {
    icon: TrendingUp,
    title: "Trainings & Workshops",
    desc: "Ongoing professional learning related to Ayurveda, child development and mental wellness.",
    list: ["Autism & ADHD awareness", "Parent guidance", "Holistic health education"],
  },
  {
    icon: HeartHandshake,
    title: "Professional Development",
    desc: "Continuous development that shaped the Neuro-Ayurveda Development System™.",
    list: ["Clinical observation", "Family guidance work", "Case understanding"],
  },
  {
    icon: UsersRound,
    title: "Community Education",
    desc: "Education and awareness initiatives for families and individuals beyond consultations.",
    list: ["Child development awareness", "Behavioural health education", "Parent guidance"],
  },
  {
    icon: Newspaper,
    title: "Media Features",
    desc: "Interviews, talks and public awareness features will be listed here as they become available.",
    list: ["Educational talks", "Public awareness", "Guest appearances"],
  },
  {
    icon: Megaphone,
    title: "Publications & Resources",
    desc: "Awareness-based content around child development, mental wellness and wellbeing.",
    list: ["Educational articles", "Parent resources", "Awareness material"],
  },
  {
    icon: HeartHandshake,
    title: "Why This Background Matters",
    desc: "A strong professional background helps families feel confident in the guidance they receive.",
    list: ["Relevant education", "Continuous learning", "Family-focused guidance"],
  },
];

export default function AboutDoctorExperience() {
  return (
    <section className="w-full bg-[#fbfaf6] py-12 md:py-16">
      <div className="mx-auto px-4 md:px-10">
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <h2 className="font-serif text-[22px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#075640] sm:text-[26px] md:text-[28px]">
            Professional Background Across 15+ Years Of Clinical Care &amp; Education
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="rounded-[14px] border border-[#e5e2d9] bg-white p-6 shadow-[0_10px_26px_rgba(5,54,39,0.05)]"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[#edf6ef] text-[#075640]">
                  <Icon size={20} />
                </div>

                <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#075640]">
                  {section.title}
                </h3>

                <p className="mb-4 text-[12.5px] leading-[1.6] text-[#5b6962]">
                  {section.desc}
                </p>

                <ul className="space-y-1.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-2 text-[12.5px] font-semibold text-[#3f5049]">
                      <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#74a76e]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
