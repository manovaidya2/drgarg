import React from "react";
import AutismADHDSymptomsReality from "./AutismADHDSymptomsReality";
import DevelopmentRoadmap from "./DevelopmentRoadmap";
import AutismCTA from "../system/AutismCTA";

export default function AutismADHDSection() {
  return (
    <>
      <section className="w-full bg-white">
        {/* SECTION 1: HERO */}
        <div className="w-full bg-[#f7f1e8] py-8 md:py-10">
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-10">
            <p className="text-[#d98923] text-[11px] uppercase tracking-[0.4em] mb-3">
              Autism & ADHD
            </p>

            <h2 className="font-serif text-[#002b18] text-[26px] sm:text-[30px] md:text-[34px] leading-[1.2] tracking-[-0.03em] max-w-[850px]">
              Autism & ADHD Are Not Just Behaviour Problems
            </h2>

            <p className="mt-4 text-[#374151] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] max-w-[780px]">
              They are neurodevelopmental patterns that need a structured{" "}
              <strong>Brain–Gut–Behaviour approach</strong> — not isolated
              therapy alone.
            </p>
          </div>
        </div>

        {/* SECTION 2: UNDERSTANDING */}
        <div className="w-full bg-white py-8 md:py-10">
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-10">
            <p className="text-[#d98923] text-[11px] uppercase tracking-[0.4em] mb-4">
              Understanding
            </p>

            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
              <h3 className="font-serif text-[#002b18] text-[22px] sm:text-[26px] md:text-[30px] leading-[1.3] tracking-[-0.02em]">
                What Autism & ADHD Really Are
              </h3>

              <div className="border-l border-[#d98923] pl-4 md:pl-6">
                <p className="text-[#4b5b55] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.7]">
                  Autism Spectrum Disorder and ADHD are neurodevelopmental
                  conditions that affect brain development, attention, sensory
                  processing, communication, social interaction, behaviour, and
                  emotional regulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AutismADHDSymptomsReality />
      <DevelopmentRoadmap   />
      <AutismCTA />
    </>
  );
}