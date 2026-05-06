import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const domains = [
  {
    title: "Autism & ADHD",
    desc: "Spectrum disorder, speech delay, eye contact, sensory issues, hyperactivity, behaviour & developmental delay.",
    link: "/autism-adhd",
  },
  {
    title: "Adult Mental Health",
    desc: "Anxiety, depression, OCD, panic, overthinking, sleep disturbance, nervous system overload.",
    link: "/adult-mental-health",
  },
  {
    title: "Teenage Mental Health",
    desc: "Study stress, screen addiction, mood swings, low confidence, parent-child communication gap.",
    link: "/teenage-mental-health",
  },
  {
    title: "Senior Mental Health",
    desc: "Memory issues, sleep disorders, cognitive decline, anxiety, brain fog, age-related concerns.",
    link: "/seniour-mental-health",
  },
];

export default function DomainExpertiseSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="w-full px-4 md:px-8 lg:px-10">
        
        {/* TEXT */}
        <div className="max-w-[800px]">
          <p className="text-[#d98923] text-[10px] uppercase tracking-[0.32em] font-medium mb-3">
            Domain Expertise
          </p>

          <h2 className="font-serif text-[#002b18] text-[26px] md:text-[34px] leading-[1.0] font-normal mb-4">
            Specialized Care Across Four Core Domains
          </h2>

          <p className="text-[#33423d] text-[14px] md:text-[15px] leading-[1.6]">
            From neurodevelopmental conditions in children to cognitive concerns
            in seniors — the Neuro-Ayurveda System adapts to every life stage.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          {domains.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.link)}
              className="cursor-pointer group relative min-h-[140px] rounded-[12px] border border-[#ddd8cf] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.02)] px-5 py-5 transition hover:shadow-md"
            >
              <ArrowRight
                size={20}
                strokeWidth={1.8}
                className="absolute right-5 top-5 text-[#5f8a76] group-hover:translate-x-1 transition"
              />

              <h3 className="font-serif text-[#002b18] text-[22px] leading-snug pr-8 mb-3">
                {item.title}
              </h3>

              <p className="text-[#33423d] text-[13px] md:text-[14px] leading-[1.6]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}