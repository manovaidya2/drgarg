import React from "react";
import { CircleCheck } from "lucide-react";

const autismSymptoms = [
  "Speech delay",
  "No response to name",
  "Sensory issues",
  "Poor social interaction",
  "Sleep problems",
  "Learning delay",
  "Poor eye contact",
  "Repetitive behaviour",
  "Hyperactivity",
  "Food selectivity",
  "Tantrums",
];

const adhdSymptoms = [
  "Poor focus",
  "Impulsiveness",
  "Difficulty sitting still",
  "Forgetfulness",
  "Low frustration tolerance",
  "Hyperactivity",
  "Emotional outbursts",
  "Poor study performance",
  "Irritability",
];

export default function AutismADHDSymptomsReality() {
  return (
    <section className="w-full bg-white">
      
      {/* SYMPTOMS */}
      <div className="w-full bg-[#f7f1e8] py-8 md:py-10">
        <div className="w-full px-4 sm:px-6 md:px-10">

          <p className="text-[#d98923] text-[12px] uppercase tracking-[0.4em] mb-4">
            Symptoms
          </p>

          <h2 className="font-serif text-[#002b18] text-[30px] sm:text-[34px] md:text-[36px] leading-[1.15] tracking-[-0.03em] mb-10">
            Common Patterns Parents Notice
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SymptomCard title="In Autism" items={autismSymptoms} />
            <SymptomCard title="In ADHD" items={adhdSymptoms} />
          </div>

        </div>
      </div>

      {/* REALITY */}
      <div className="w-full bg-white py-10 md:py-12">
        <div className="w-full px-4 sm:px-6 md:px-10">

          <p className="text-[#d98923] text-[12px] uppercase tracking-[0.4em] mb-4">
            The Reality
          </p>

          <h2 className="font-serif text-[#002b18] text-[28px] sm:text-[32px] md:text-[34px] leading-[1.15] tracking-[-0.03em] mb-8">
            Why Therapy Alone May Be Slow
          </h2>

          <div className="max-w-[780px] space-y-4 text-[#263b33] text-[16px] md:text-[18px] leading-[1.7]">
            <p>
              Therapy is external training — it teaches the child skills. But if
              the internal brain system is not ready, the child may not absorb
              therapy properly. This is why many parents say therapy is going
              on, but progress is slow.
            </p>

            <p>
              The{" "}
              <a
                href="/neuro-ayurveda-system"
                className="text-[#004124] underline decoration-[#004124]/40 underline-offset-2"
              >
                Neuro-Ayurveda Autism Development Program
              </a>{" "}
              works on brain nourishment, gut repair, neural activation, sensory
              integration, behaviour guidance, parent training, and monthly
              progress tracking — together.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

function SymptomCard({ title, items }) {
  return (
    <div className="rounded-[16px] border border-[#dedbd3] bg-white px-6 md:px-7 py-7 min-h-[230px]">
      
      <h3 className="font-serif text-[#002b18] text-[20px] mb-5">
        {title}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CircleCheck
              size={16}
              strokeWidth={1.8}
              className="text-[#d98923] flex-shrink-0"
            />
            <span className="text-[#263b33] text-[16px] leading-snug">
              {item}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}