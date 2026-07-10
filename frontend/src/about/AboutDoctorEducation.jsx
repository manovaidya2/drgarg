import React from "react";
import { GraduationCap } from "lucide-react";

export default function AboutDoctorEducation() {
  return (
    <section className="w-full bg-white pb-10 pt-2 md:pb-12">
      <div className="mx-auto max-w-[760px] px-4 text-center md:px-10">
        <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-full bg-[#edf6ef] text-[#075640]">
          <GraduationCap size={20} />
        </div>
        <h2 className="mb-3 text-[17px] font-bold text-[#075640]">Education</h2>
        <p className="text-[14.5px] font-medium leading-[1.8] text-[#45544e]">
          Dr. Ankush Garg is an Ayurvedacharya with formal education and
          clinical training in Ayurveda, rooted in a broader understanding of
          health that includes body, mind, lifestyle, digestion, behaviour
          and overall wellbeing — an important foundation for his work in
          child development, mental wellness and mind-body health.
        </p>
      </div>
    </section>
  );
}
