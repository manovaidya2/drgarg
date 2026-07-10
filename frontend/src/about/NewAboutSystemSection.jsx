import React from "react";
import { Link } from "react-router-dom";
import { Brain, Leaf, MoveUpRight, Network, Sparkles, Waves } from "lucide-react";

const pillars = [
  { icon: Brain, title: "Brain Nourishment System", text: "Supporting attention, learning, cognitive development and emotional wellbeing." },
  { icon: Leaf, title: "Gut Response System", text: "Understanding the connection between digestive health, nutrition and overall wellbeing." },
  { icon: Network, title: "Neural Network System", text: "Supporting developmental growth, learning pathways and adaptation." },
  { icon: Waves, title: "Sensory Integration System", text: "Helping individuals better process and respond to sensory information." },
  { icon: Sparkles, title: "Behaviour Guidance System", text: "Supporting communication, emotional regulation and behavioural development." },
];

export default function NewAboutSystemSection() {
  return (
    <section className="bg-white px-5 pb-8 sm:px-8 lg:px-12">
      <div className="mx-auto  rounded-[16px] bg-[#fbfaf6] px-6 py-9 shadow-[0_16px_40px_rgba(5,54,39,0.06)] sm:px-10">
        <div className="mx-auto max-w-[880px] text-center">
          <h2 className="font-serif text-[28px] font-semibold text-[#075640]">
            The Neuro-Ayurveda Development System<sup className="text-[13px]">TM</sup>
          </h2>
          <div className="mt-3 space-y-3 text-[15px] font-medium leading-[1.75] text-[#58655f]">
            <p>
              While working with families and individuals, Dr Ankush Garg recognised
              that developmental and emotional concerns are rarely influenced by a
              single factor.
            </p>
            <p>
              Children with similar diagnoses often present with different challenges.
              Similarly, individuals experiencing similar emotional concerns may
              require different forms of support depending on their unique
              circumstances.
            </p>
            <p>
              These observations contributed to the development of the Neuro-Ayurveda
              Development System<sup>TM</sup>, a structured framework designed to
              understand the interconnected factors that may influence development,
              behaviour and wellbeing.
            </p>
            <p className="font-bold text-[#075640]">
              The system focuses on five important areas:
            </p>
          </div>
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-5">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`text-center ${index !== 0 ? "md:border-l md:border-[#dedbd2]" : ""}`}
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#e5e1d5] bg-white text-[#075640]">
                  <Icon size={30} strokeWidth={1.7} />
                </div>
                <h3 className="mt-4 text-[14px] font-extrabold text-[#075640]">
                  {item.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[155px] text-[12px] font-medium leading-[1.75] text-[#4b5b54]">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-9 text-center">
          <Link
            to="/neuro-ayurveda-system"
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[5px] bg-[#075640] px-7 text-[12px] font-bold uppercase text-white transition hover:bg-[#064834]"
          >
            Learn More About The Neuro-Ayurveda Development System
            <MoveUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
