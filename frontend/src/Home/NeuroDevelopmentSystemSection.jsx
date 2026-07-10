import React from "react";

const systems = [
  {
    title: "Brain Nourishment System",
    description:
      "Nourishing the brain for focus, learning and emotional balance.",
    color: "#064834",
    bg: "#e7f2ec",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-10 w-10">
        <path
          d="M21 10c-4 0-7 3-7 7v2c-3 1-5 4-5 8s3 7 7 8c1 4 4 7 8 7V10h-3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27 10c4 0 7 3 7 7v2c3 1 5 4 5 8s-3 7-7 8c-1 4-4 7-8 7V10h3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 20c3 0 5 2 5 5m11-5c-3 0-5 2-5 5M15 31c3-1 6 0 8 3m10-3c-3-1-6 0-8 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Gut Response System",
    description:
      "Improving gut health to enhance mood, immunity and behaviour.",
    color: "#064834",
    bg: "#eaf5ef",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-10 w-10">
        <path
          d="M15 12c3 5 8 6 14 4 5-2 8 1 8 5 0 5-4 8-9 8h-6c-5 0-9 3-9 7 0 3 3 6 7 6h8c5 0 9-4 9-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 12h15M20 24h10M22 36h8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Neural Network System",
    description:
      "Strengthening neural connections for better development & learning.",
    color: "#064834",
    bg: "#eef7f2",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-10 w-10">
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <circle cx="24" cy="8" r="3" fill="currentColor" />
        <circle cx="39" cy="17" r="3" fill="currentColor" />
        <circle cx="39" cy="33" r="3" fill="currentColor" />
        <circle cx="24" cy="40" r="3" fill="currentColor" />
        <circle cx="9" cy="33" r="3" fill="currentColor" />
        <circle cx="9" cy="17" r="3" fill="currentColor" />
        <path
          d="M24 12v8m4-2 8-4m-8 16 8 4m-12-6v8m-4-6-8 4m8-16-8-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Sensory Integration System",
    description:
      "Supporting sensory processing for better adaptation & comfort.",
    color: "#064834",
    bg: "#e4f0ea",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-10 w-10">
        <circle
          cx="15"
          cy="16"
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        <circle
          cx="33"
          cy="16"
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        <circle
          cx="15"
          cy="32"
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        <circle
          cx="33"
          cy="32"
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        <path
          d="M19 20l10 8m0-8-10 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Behaviour Guidance System",
    description:
      "Guiding behaviour through understanding, structure and positive support.",
    color: "#064834",
    bg: "#f1f8f4",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-10 w-10">
        <circle
          cx="18"
          cy="14"
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
        />
        <path
          d="M9 38v-7c0-5 4-9 9-9s9 4 9 9v7H9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <circle
          cx="32"
          cy="17"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <path
          d="M29 38v-5c0-4 3-7 7-7s7 3 7 7v5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function NeuroDevelopmentSystemSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto ">
        <div className="text-center">
          <span className="inline-flex rounded-[8px] bg-[#e7f2ec] px-6 py-1.5 text-[11px] font-bold uppercase text-[#064834]">
            Our Unique Approach
          </span>
          <h2 className="mt-4 text-[23px] font-bold leading-tight text-[#111111] sm:text-[30px] lg:text-[34px]">
            The{" "}
            <span className="text-[#111111]">
              Neuro-Ayurveda Development System&trade;
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[14px] font-medium leading-[1.45] text-[#4d5d56] sm:text-[15px]">
            A holistic, science-based framework addressing the root factors that
            influence development, behaviour and emotional well-being.
          </p>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {systems.map((system) => (
            <article
              key={system.title}
              className="flex min-h-[260px] flex-col items-center rounded-[12px] border border-[#dce8e2] bg-white px-7 py-7 text-center shadow-[0_8px_22px_rgba(6,72,52,0.08)]"
            >
              <div
                className="flex h-[82px] w-[82px] items-center justify-center rounded-full"
                style={{ backgroundColor: system.bg, color: system.color }}
              >
                {system.icon}
              </div>
              <h3 className="mt-5 text-[16px] font-bold leading-[1.25] text-[#10271f]">
                {system.title}
              </h3>
              <p className="mt-5 text-[12px] font-medium leading-[1.6] text-[#4d5d56]">
                {system.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
