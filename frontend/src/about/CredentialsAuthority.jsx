import React from "react";

const credentials = [
  {
    title: "BAMS — Bachelor of Ayurvedic Medicine & Surgery",
    desc: "Foundation in classical Ayurvedic diagnosis, formulations and clinical practice — the basis of his identity as an Ayurvedacharya.",
  },
  {
    title: "MPH — Master of Public Health",
    desc: "Population-level understanding of health, prevention and lifestyle — the lens through which he sees mental health and neurodevelopment.",
  },
  {
    title: "PhD — Gut-Brain Axis Research",
    desc: "Original research connecting gut microbiome, inflammation, neurotransmitters and brain function — the spine of the Neuro-Ayurveda System.",
  },
  {
    title: "Classical Lineage Training",
    desc: "Trained under respected Ayurvedic clinicians and traditional teachers, with deep grounding in Charaka Samhita and Sushruta Samhita.",
  },
];

export default function CredentialsAuthority() {
  return (
    <section className="w-full bg-white py-7 md:py-9">
      <div className="max-w-[1300px] mx-auto px-4 md:px-[50px]">
        
        {/* TOP */}
        <p className="text-[#d98923] text-[11px] uppercase tracking-[0.38em] mb-4">
          Qualifications
        </p>

        <h2 className="font-serif text-[#002b18] text-[30px] sm:text-[34px] md:text-[36px] leading-[1.12] tracking-[-0.03em]">
          Credentials That Define Authority
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          {credentials.map((item) => (
            <div
              key={item.title}
              className="rounded-[4px] border border-[#dedbd3] bg-white px-6 py-6 shadow-[0_6px_18px_rgba(0,0,0,0.02)]"
            >
              <p className="text-[#b7742c] text-[10px] uppercase tracking-[0.5em] mb-4">
                Credential
              </p>

              <h3 className="font-serif text-[#002b18] text-[19px] leading-snug mb-3">
                {item.title}
              </h3>

              <p className="text-[#2f3f4a] text-[15px] leading-[1.55] max-w-[520px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}