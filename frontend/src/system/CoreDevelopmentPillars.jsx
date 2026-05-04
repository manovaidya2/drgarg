import React from "react";
import { Brain, Leaf, Activity, Sparkles, Users } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    no: "Pillar 01",
    title: "Brain Nourishment",
    desc: "Supports the brain's functional strength, attention, response, learning ability, and cognitive processing. Without proper brain support, children may struggle with speech, response, learning, attention, and behaviour.",
  },
  {
    icon: Leaf,
    no: "Pillar 02",
    title: "Gut Repair",
    desc: "The gut and brain are deeply connected through the gut-brain axis. Gut imbalance may affect behaviour, mood, sleep, attention, and neurological function.",
  },
  {
    icon: Activity,
    no: "Pillar 03",
    title: "Neural Activation",
    desc: "Stimulates weak neural pathways so the child or patient becomes more responsive, alert, attentive, and engaged — especially important in autism, ADHD, and speech delay.",
  },
  {
    icon: Sparkles,
    no: "Pillar 04",
    title: "Sensory Integration",
    desc: "Helps children process sensory overload — sound, touch, food textures, eye contact, and environment — more calmly and naturally.",
  },
  {
    icon: Users,
    no: "Pillar 05",
    title: "Behaviour Guidance",
    desc: "Parent education, structured routine, emotional support, response shaping, and practical daily-life improvement. Behaviour is treated as a signal, not a problem.",
  },
];

export default function CoreDevelopmentPillars() {
  return (
    <section className="w-full bg-[#f7f1e8] py-8 md:py-10">
      <div className="max-w-full mx-auto px-5 md:px-10">
        <p className="text-[#d98923] text-[12px] uppercase tracking-[0.42em] mb-3">
          The 5 Pillars
        </p>

        <h2 className="font-serif text-[#002b18] text-[28px] sm:text-[30px] md:text-[36px] leading-[1.15] tracking-[-0.03em] mb-10">
          The 5 Core Development Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
          {pillars.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.no}
                className="rounded-[10px] border border-[#dedbd3] bg-white px-6 py-6 min-h-[168px] shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-start gap-4">
                  <div className="h-[36px] w-[36px] flex-shrink-0 rounded-[8px] bg-[#e8eeeb] flex items-center justify-center">
                    <Icon size={18} strokeWidth={2} className="text-[#004124]" />
                  </div>

                  <div>
                    <p className="text-[#d98923] text-[10px] uppercase tracking-[0.36em] mb-1">
                      {item.no}
                    </p>

                    <h3 className="font-serif text-[#002b18] text-[20px] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-[#2f3f4a] text-[18px] leading-[1.65]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}