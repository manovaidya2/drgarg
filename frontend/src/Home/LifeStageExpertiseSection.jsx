import React from "react";
import { ArrowRight } from "lucide-react";

const expertiseAreas = [
  {
    title: "Child Development",
    description:
      "Autism, ADHD, Speech Delay, Learning Difficulties and Behavioural Challenges.",
    link: "/child-development-care",
    color: "#7b47be",
    bg: "#eee5ff",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
        <circle cx="24" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="2.7" />
        <path d="M16 23c0-5 4-8 8-8s8 3 8 8v15H16V23Z" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinejoin="round" />
        <path d="M14 27h20M20 38v-9m8 9v-9M25 8l5-5m0 0h-5m5 0v5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Teen Mental Wellness",
    description:
      "Stress, Anxiety, Depression, Confidence, Screen Dependency and more.",
    link: "https://manovaidya.org/teen-mental-wellness",
    color: "#4d9b44",
    bg: "#e3f2dd",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
        <path d="M12 36c1-9 6-15 14-18 5-2 8-5 9-9 5 5 5 14-1 20-5 5-12 6-22 7Z" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
        <path d="M14 35c6-8 13-13 22-17M21 26l-1-8m8 3 4-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Adult Mental Health",
    description:
      "Anxiety, Depression, Stress, Burnout, Sleep Issues and Emotional Wellbeing.",
    link: "https://manovaidya.org/adult-mental-wellness",
    color: "#3278c6",
    bg: "#e4f0ff",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
        <circle cx="24" cy="15" r="7" fill="none" stroke="currentColor" strokeWidth="2.7" />
        <path d="M11 40c1-9 6-14 13-14s12 5 13 14H11Z" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinejoin="round" />
        <path d="M20 34h8M24 26v8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Women Mental Health",
    description:
      "Hormonal Changes, Emotional Wellbeing, Life Transitions and more.",
    link: "https://manovaidya.org/women-health-care",
    color: "#df5f83",
    bg: "#ffe3ee",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
        <circle cx="24" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="2.7" />
        <path d="M15 41c1-9 5-15 9-15s8 6 9 15" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
        <path d="M18 18c4-1 8-4 10-8m4 10c-4-1-8-5-9-10M24 27v8m-5 0h10" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Senior Mind & Memory Care",
    description:
      "Memory Concerns, Dementia, Alzheimer's Support and Cognitive Wellness.",
    link: "https://manovaidya.org/senior-mind-memory-care",
    color: "#d88636",
    bg: "#ffead8",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
        <circle cx="18" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="2.7" />
        <path d="M8 40c1-9 5-16 10-16s9 7 10 16" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
        <path d="M30 20c4 0 7 3 7 7v13m-6-5h9M37 40h5" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Mind & Body Concerns",
    description:
      "Migraine, Sleep Issues, Gut Health, Thyroid, Stress-Related Physical Symptoms.",
    link: "https://manovaidya.org/mind-body-wellbeing",
    color: "#2e8c91",
    bg: "#dff5f3",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
        <path d="M22 9c-5 0-9 4-9 9v2c-3 1-5 4-5 8s3 7 7 8c1 3 4 5 7 5V9Z" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 9c5 0 9 4 9 9v2c3 1 5 4 5 8s-3 7-7 8c-1 3-4 5-7 5V9Z" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 21c3 0 5 2 5 5m9-5c-3 0-5 2-5 5M17 32c3-1 5 0 7 3m7-3c-3-1-5 0-7 3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function LifeStageExpertiseSection() {
  return (
    <section className="bg-[#f6fbf8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto ">
        <div className="text-center">
          <p className="text-[14px] font-bold uppercase tracking-[0.08em] text-[#064834]">
            Areas Of Expertise
          </p>
          <h2 className="mt-2 text-[24px] font-bold leading-tight text-[#111111] sm:text-[30px] lg:text-[33px]">
            Comprehensive Support For{" "}
            <span className="text-[#064834]">Every Stage Of Life</span>
          </h2>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {expertiseAreas.map((area) => (
            <article
              key={area.title}
              className="flex min-h-[232px] flex-col items-center rounded-[13px] border border-[#dce8e2] bg-white px-5 py-5 text-center shadow-[0_8px_20px_rgba(6,72,52,0.07)]"
            >
              <div
                className="flex h-[62px] w-[62px] items-center justify-center rounded-full"
                style={{ backgroundColor: area.bg, color: area.color }}
              >
                {area.icon}
              </div>

              <h3 className="mt-3 min-h-[44px] text-[15px] font-bold leading-[1.25] text-[#111111]">
                {area.title}
              </h3>

              <p className="mt-2 min-h-[68px] text-[11px] font-normal leading-[1.6] text-[#4d5d56]">
                {area.description}
              </p>

              <a
                href={area.link}
                className="mt-auto inline-flex items-center gap-2 pt-3 text-[12px] font-semibold text-[#064834] transition hover:text-[#053b2b]"
              >
                Learn More
                <ArrowRight size={13} strokeWidth={2.2} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
