import React from "react";
import doctorImg from "../images/White coat.webp";

export default function DoctorAuthoritySection() {
  return (
    <section className="w-full bg-[#fbfaf7] py-10 md:py-14">
      <div className="mx-auto max-w-full px-5 md:px-10">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[340px_1fr] lg:gap-10">
          <div className="w-full">
            <div className="overflow-hidden rounded-[2px] border border-[#e3d8c7] bg-white">
              <img
                src={doctorImg}
                alt="Dr Ankush Garg"
                className="h-[310px] w-full object-cover object-center sm:h-[360px] lg:h-[340px]"
              />
            </div>

            <div className="mt-5 rounded-[3px] border border-[#e4c78d] bg-[#faf6ef] px-4 py-4">
              <p className="mb-4 text-[12px] uppercase tracking-[0.42em] text-[#b7742c]">
                At a Glance
              </p>

              <ul className="space-y-3 text-[14px] leading-[1.45] text-[#1f2f2a]">
                <li>• Ayurvedacharya</li>
                <li>• Child Development & Mental Wellness Specialist</li>
                <li>• PhD Research - <strong>Gut-Brain Axis</strong></li>
                <li>• Developer of the <strong>Neuro-Ayurveda Development System</strong></li>
                <li>• Founder of <strong>Manovaidya</strong>, Noida</li>
              </ul>
            </div>
          </div>

          <div className="pt-0 lg:pt-1">
            <p className="mb-7 text-[12px] uppercase tracking-[0.5em] text-[#b7742c]">
              Profile
            </p>

            <h2 className="max-w-[710px] font-serif text-[28px] leading-[1.12] tracking-[-0.03em] text-[#002b18] sm:text-[34px] md:text-[38px]">
              Dr. Ankush Garg, Founder of Manovaidya
            </h2>

            <div className="mt-6 max-w-[680px] space-y-5 text-[15px] leading-[1.65] text-[#1f2f2a] md:text-[16px]">
              <p>
                Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and
                developer of the Neuro-Ayurveda Development System. He has 7+
                years of focused experience in child development and mental
                wellness. His ongoing PhD research explores the relationship
                between the gut–brain axis, behaviour and emotional wellbeing.
              </p>

              <p>
                His work focuses on Autism Spectrum Disorder (ASD), ADHD, child
                development, behavioural challenges, speech and communication
                concerns, teen mental health, adult mental health, women&apos;s
                emotional wellbeing, stress-related concerns and senior mental
                health support.
              </p>

              <p>
                Through Manovaidya, Dr. Ankush Garg combines traditional
                Ayurvedic understanding with modern insights into brain
                development, behaviour, emotional wellbeing and cognitive
                health. His approach emphasizes assessment, personalized
                guidance, family-centred support and long-term wellness
                planning.
              </p>

              <p>
                Through detailed assessment, individualized recommendations and
                structured follow-up, he helps children, adults and families
                better understand their concerns and move forward with greater
                clarity and direction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
