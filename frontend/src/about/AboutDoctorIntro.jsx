import React from "react";
import { ShieldCheck } from "lucide-react";

export default function AboutDoctorIntro() {
  return (
    <section className="w-full bg-white pb-4 pt-12 md:pt-16">
      <div className="mx-auto max-w-[820px] px-4 text-center md:px-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf6ef] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#075640]">
          <ShieldCheck size={14} />
          Professional Background &amp; Training
        </div>

        <h1 className="mb-5 font-serif text-[24px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#075640] sm:text-[30px] md:text-[34px]">
          Education, Clinical Experience &amp; Professional Development Of Dr. Ankush Garg
        </h1>

        <p className="text-[15px] font-medium leading-[1.85] text-[#45544e] md:text-[16px]">
          Trust is one of the most important parts of healthcare guidance.
          Families want to understand not only what a professional says, but
          also the background, training, experience and approach behind the
          guidance. This page provides an overview of Dr. Ankush Garg's
          professional background, clinical learning, training, educational
          work and ongoing development.
        </p>
      </div>
    </section>
  );
}
