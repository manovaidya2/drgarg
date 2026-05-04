import React from "react";

export default function AboutDoctorIntro() {
  return (
    <section className="w-full bg-[#f8f3ea] py-10 md:py-12">
      <div className="w-full px-5 md:px-10 lg:px-10">
        <div className="max-w-[980px]">
          <p className="text-[#d98923] text-[11px] uppercase tracking-[0.36em] font-medium mb-3">
            About the Doctor
          </p>

          <h2 className="font-serif text-[#002b18] text-[28px] md:text-[36px] leading-[1.18] font-normal mb-5">
            Dr. Ankush Garg — India&apos;s No.1 Autism Doctor & Leading
            Ayurvedic Neurologist
          </h2>

          <div className="bg-white rounded-[16px] border border-[#ddd8cf] shadow-[0_6px_18px_rgba(0,0,0,0.03)] px-5 md:px-7 py-5 md:py-6">
            <p className="text-[#33423d] text-[15px] md:text-[17px] leading-[1.7]">
              BAMS · MPH · PhD{" "}
              <span className="text-[#002b18] font-semibold">
                (Gut-Brain Axis Research)
              </span>{" "}
              · Ayurvedacharya · Neuro-Ayurveda Specialist · Founder of
              Manovaidya · Developer of the Neuro-Ayurveda System.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}