import React from "react";

export default function NeuroAyurvedaSystemSections() {
  return (
    <>
      {/* SECTION 1: THE SYSTEM */}
      <section className="w-full bg-white py-8 md:py-10">
        <div className="mx-auto px-4 md:px-10">
          <p className="text-[#d98923] text-[10px] uppercase tracking-[0.35em] mb-4">
            The System
          </p>

          <h2 className="font-serif text-[#002b18] text-[24px] sm:text-[30px] md:text-[34px] leading-[1.35] tracking-[-0.02em] max-w-2xl mb-4">
            The Neuro-Ayurveda System
          </h2>

          <div className="w-[50px] h-[2px] bg-[#d98923] mb-5" />

          <p className="text-[#374151] text-[14px] md:text-[15px] leading-[1.7] max-w-2xl">
            A root-cause treatment model developed by Dr. Ankush Garg for
            autism, ADHD, mental health, and neurodevelopmental disorders —
            built on the connection between brain, gut, nervous system,
            emotions, and behaviour.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE FOUNDATION */}
      <section className="w-full bg-[#f9faf7] py-8 md:py-10">
        <div className=" mx-auto px-4 md:px-10">
          <p className="text-[#d98923] text-[10px] uppercase tracking-[0.35em] mb-4">
            The Foundation
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
            <h2 className="font-serif text-[#002b18] text-[22px] sm:text-[28px] md:text-[32px] leading-[1.4] tracking-[-0.02em]">
              Designed for Patients Who Feel
              <br />
              Stuck or Only Partially Improved
            </h2>

            <div className="border-l border-[#d98923] pl-4">
              <p className="text-[#374151] text-[14px] md:text-[15px] leading-[1.7]">
                The Neuro-Ayurveda System is a structured treatment model that
                works on the connection between the brain, gut, nervous system,
                emotions, and behaviour.
              </p>

              <p className="text-[#374151] text-[14px] md:text-[15px] leading-[1.7] mt-3">
                It is designed for patients who have tried conventional
                approaches but still feel stuck, confused, or only partially
                improved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}