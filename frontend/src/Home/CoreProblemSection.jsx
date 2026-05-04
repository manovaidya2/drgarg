import React from "react";
import { Heart } from "lucide-react";

const questions = [
  "Why is the brain not responding properly?",
  "Why is behaviour not stabilizing?",
  "Why is therapy giving slow results?",
  "Why do symptoms come back again and again?",
];

export default function CoreProblemSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <div className="max-w-[720px]">
          <p className="text-[#d98923] text-[12px] uppercase tracking-[0.36em] font-medium mb-4">
            The Core Problem
          </p>

          <h2 className="font-serif text-[#002b18] text-[30px] md:text-[34px] leading-[1.18] font-normal mb-6">
            Most Patients Are Treating
            <br />
            Symptoms, Not the Root Cause
          </h2>

          <p className="text-[#33423d] text-[18px] leading-[1.6] font-normal max-w-[710px]">
            Many children and adults struggling with autism, ADHD, anxiety,
            depression, OCD, overthinking, sleep issues, and behavioural
            problems are often treated only at the symptom level — speech
            therapy, behavioural therapy, counselling, or temporary
            symptom-control medication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mt-12">
          {questions.map((item, index) => (
            <div
              key={index}
              className="min-h-[110px] rounded-[14px] border border-[#e4e0d8] bg-white shadow-[0_8px_22px_rgba(0,0,0,0.03)] px-6 flex flex-col justify-center"
            >
              <Heart
                size={19}
                strokeWidth={2}
                className="text-[#f05a1a] mb-4"
              />

              <p className="font-serif text-[#002b18] text-[17px] leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[#33423d] text-[17px] md:text-[18px] leading-[1.55] max-w-[1160px]">
          This is where Dr. Ankush Garg&apos;s{" "}
          <strong className="font-semibold">Neuro-Ayurveda System</strong>{" "}
          works differently — looking deeper into brain function, gut health,
          nervous system regulation, emotional patterns, lifestyle, and
          behaviour together.
        </p>
      </div>
    </section>
  );
}