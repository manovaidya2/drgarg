import React from "react";
import { Brain, Leaf, Activity, Sparkles, Users, ArrowRight } from "lucide-react";

const methods = [
  {
    icon: Brain,
    no: "01",
    title: "Brain Nourishment",
    desc: "Supporting attention, response, learning, and cognitive processing.",
  },
  {
    icon: Leaf,
    no: "02",
    title: "Gut Repair",
    desc: "Healing the gut–brain axis for better mood, sleep, and behaviour.",
  },
  {
    icon: Activity,
    no: "03",
    title: "Neural Activation",
    desc: "Stimulating weak neural pathways for alertness and engagement.",
  },
  {
    icon: Sparkles,
    no: "04",
    title: "Sensory Integration",
    desc: "Helping the child process sound, touch, and environment calmly.",
  },
  {
    icon: Users,
    no: "05",
    title: "Behaviour Guidance",
    desc: "Parent education, structured routine, and emotional support.",
  },
];

export default function NeuroAyurvedaMethod() {
  return (
    <section className="w-full bg-white py-10 md:py-12">
      <div className=" mx-auto px-4 md:px-10">

        {/* TOP TEXT */}
        <div className="max-w-[820px]">
          <p className="text-[#d98923] text-[11px] uppercase tracking-[0.32em] font-medium mb-3">
            The Method
          </p>

          <h2 className="font-serif text-[#002b18] text-[30px] md:text-[34px] leading-[1.2] mb-4">
            The Neuro-Ayurveda System
            <br />
            Developed by Dr. Ankush Garg
          </h2>

          <p className="text-[#33423d] text-[17px] md:text-[18px] leading-[1.55]">
            A root-cause treatment model that integrates Ayurveda, gut-brain
            axis research, nervous system regulation, behavioural understanding,
            and modern clinical observation.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          {methods.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.no}
                className="min-h-[210px] rounded-[14px] border border-[#e3dfd7] bg-white shadow-[0_6px_18px_rgba(0,0,0,0.03)] px-5 py-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="h-9 w-9 rounded-[10px] bg-[#eef3f0] flex items-center justify-center">
                    <Icon size={20} className="text-[#004124]" />
                  </div>

                  <span className="font-serif text-[10px] text-[#d98923] mt-2">
                    {item.no}
                  </span>
                </div>

                <h3 className="font-serif text-[#002b18] text-[16px] mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-[#4a5a55] text-[14px] leading-[1.5]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* LINK */}
        <a
          href="/neuro-ayurveda-system"
          className="inline-flex items-center gap-2 mt-8 text-[#002b18] text-[14px] font-semibold hover:text-[#d98923] transition"
        >
          See the full Neuro-Ayurveda System
          <ArrowRight size={16} />
        </a>

      </div>
    </section>
  );
}