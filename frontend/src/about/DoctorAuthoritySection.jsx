import React from "react";
import doctorImg from "../images/White coat.webp";

export default function DoctorAuthoritySection() {
  return (
    <section className="w-full bg-[#fbfaf7] py-10 md:py-14">
      <div className="max-w-full mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-10 items-start">
          
          {/* LEFT IMAGE + CARD */}
          <div className="w-full">
            <div className="rounded-[2px] overflow-hidden border border-[#e3d8c7] bg-white">
              <img
                src={doctorImg}
                alt="Dr Ankush Garg"
                className="w-full h-[310px] sm:h-[360px] lg:h-[340px] object-cover object-center"
              />
            </div>

            <div className="mt-5 rounded-[3px] border border-[#e4c78d] bg-[#faf6ef] px-4 py-4">
              <p className="text-[#b7742c] text-[12px] uppercase tracking-[0.42em] mb-4">
                At a Glance
              </p>

              <ul className="space-y-3 text-[#1f2f2a] text-[14px] leading-[1.45]">
                <li>
                  • Recognized for work in <strong>autism care</strong>
                </li>
                <li>
                  • Focused <strong>Ayurvedic neurologist</strong> for ADHD & speech delay
                </li>
                <li>
                  • <strong>Mental health Ayurveda doctor</strong> for anxiety,
                  OCD, depression
                </li>
                <li>
                  • PhD researcher — <strong>Gut-Brain Axis</strong>
                </li>
                <li>
                  • Developer of the <strong>Neuro-Ayurveda System</strong>
                </li>
                <li>
                  • Founder of <strong>Manovaidya</strong>, Noida
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="pt-0 lg:pt-1">
            <p className="text-[#b7742c] text-[12px] uppercase tracking-[0.5em] mb-7">
              Authority
            </p>

            <h2 className="font-serif text-[#002b18] text-[28px] sm:text-[34px] md:text-[38px] leading-[1.12] tracking-[-0.03em] max-w-[710px]">
              The Doctor Families Across India Trust for
              Autism, ADHD & Mental Health
            </h2>

            <div className="mt-6 max-w-[680px] space-y-5 text-[#1f2f2a] text-[15px] md:text-[16px] leading-[1.65]">
              <p>
Dr. Ankush Garg is an Autism, ADHD, Child Development & Mental Health Specialist in India, Founder of Manovaidya and Creator of the Neuro-Ayurveda Development System, a structured framework developed to support developmental, behavioural and mental wellness concerns through a comprehensive and personalized approach.

              </p>

              <p>
               His work focuses on Autism Spectrum Disorder (ASD), ADHD, Child Development, Behavioural Challenges, Speech & Communication Concerns, Teen Mental Health, Adult Mental Health, Women’s Emotional Wellbeing, Stress-Related Concerns and Senior Mental Health Support.

              </p>

              <p>
              Through Manovaidya, Dr. Ankush Garg combines traditional Ayurvedic understanding with modern insights into brain development, behaviour, emotional wellbeing and cognitive health. His approach emphasizes root-cause understanding, personalized guidance, family-centred support and long-term wellness planning.

              </p>
              <p>Through detailed assessment, individualized recommendations and structured follow-up, he helps children, adults and families better understand their concerns and move forward with greater clarity, confidence and direction.
</p>
<p>Families from across India connect with Dr. Ankush Garg for Autism, ADHD, Child Development and Mental Health support through a compassionate, personalized and structured Neuro-Ayurveda approach.
</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
