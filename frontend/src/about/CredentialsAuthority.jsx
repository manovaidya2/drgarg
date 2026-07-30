import React from "react";

const credentials = [
  {
    title: "BAMS - Bachelor of Ayurvedic Medicine & Surgery",
    desc: "Foundation in classical Ayurvedic diagnosis, formulations and clinical practice - the basis of his identity as an Ayurvedacharya.",
  },
  {
    title: "MPH - Master of Public Health",
    desc: "Population-level understanding of health, prevention and lifestyle - the lens through which he sees mental health and neurodevelopment.",
  },
  {
    title: "PhD Research - Gut-Brain Axis",
    desc: "Research focus on gut-brain axis concepts and their relationship with development, behaviour and mental wellness.",
  },
  {
    title: "Classical Lineage Training",
    desc: "Trained under respected Ayurvedic clinicians and traditional teachers, with grounding in classical Ayurvedic texts.",
  },
];

export default function CredentialsAuthority() {
  return (
    <section className="w-full bg-white py-7 md:py-9">
      <div className=" mx-auto px-4 md:px-10">
        <p className="mb-4 text-[11px] uppercase tracking-[0.38em] text-[#d98923]">
          Qualifications
        </p>

        <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.03em] text-[#002b18] sm:text-[34px] md:text-[36px]">
          Credentials That Define Authority
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {credentials.map((item) => (
            <div
              key={item.title}
              className="rounded-[4px] border border-[#dedbd3] bg-white px-6 py-6 shadow-[0_6px_18px_rgba(0,0,0,0.02)]"
            >
              <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#b7742c]">
                Credential
              </p>

              <h3 className="mb-3 font-serif text-[19px] leading-snug text-[#002b18]">
                {item.title}
              </h3>

              <p className="max-w-[520px] text-[15px] leading-[1.55] text-[#2f3f4a]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
