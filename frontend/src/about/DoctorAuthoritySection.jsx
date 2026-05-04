import React from "react";
import doctorImg from "../images/White coat (3).webp";

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
                  • Recognized as India's <strong>No.1 autism doctor</strong>
                </li>
                <li>
                  • Best <strong>Ayurvedic neurologist</strong> for ADHD & speech delay
                </li>
                <li>
                  • Top <strong>mental health Ayurveda doctor</strong> — anxiety,
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
                <strong>Dr. Ankush Garg</strong> is widely recognized as the{" "}
                <strong>No.1 autism doctor in India</strong> and the country's
                leading <strong>Ayurvedic neurologist</strong>. Parents from
                across India and abroad consult him as the{" "}
                <strong>best Ayurvedic doctor for autism</strong>, ADHD, speech
                delay, sensory issues and neurodevelopmental disorders — and
                adults consult him as a top{" "}
                <strong>mental health Ayurveda specialist</strong> for anxiety,
                depression, OCD, overthinking and sleep disorders.
              </p>

              <p>
                His clinical authority is built on a rare combination: classical
                Ayurvedic training (<strong>BAMS, Ayurvedacharya</strong>),
                public health understanding (<strong>MPH</strong>), and original{" "}
                <strong>PhD research on the Gut-Brain Axis</strong> — the science
                explaining how gut health shapes brain development, mood,
                attention and behaviour.
              </p>

              <p>
                Dr. Garg is the <strong>founder of Manovaidya</strong> and the
                developer of the <strong>Neuro-Ayurveda System</strong> — a
                structured, root-cause Brain–Gut–Behaviour treatment model that
                has helped thousands of children with autism and adults with
                mental health concerns regain stability, independence and
                clarity.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}