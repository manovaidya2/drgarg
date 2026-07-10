import React from "react";
import { Activity, Brain, Leaf, Sparkles, Users } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    no: "Pillar 01",
    title: "Brain Nourishment System",
    desc: "The Brain Nourishment System focuses on supporting the foundations of attention, learning, emotional stability and cognitive functioning. This pillar looks at how nourishment, routine, sleep, lifestyle and overall wellbeing may influence brain function and development.",
    points: [
      "Attention difficulties",
      "Learning challenges",
      "Emotional regulation",
      "Mental fatigue",
      "Developmental growth",
      "Stress and overthinking",
    ],
    goal: "The goal is to understand whether the brain is receiving the right support for stable functioning, learning and emotional balance.",
  },
  {
    icon: Leaf,
    no: "Pillar 02",
    title: "Gut Response System",
    desc: "The Gut Response System focuses on the connection between digestion, nutrition, gut comfort and overall wellbeing. In many children and adults, digestive patterns, appetite, food habits, gut discomfort and lifestyle routines may influence emotional wellbeing, behaviour, energy and daily functioning.",
    points: [
      "Gut-brain connection",
      "Stress-related digestion",
      "Food habits",
      "Energy levels",
      "Emotional sensitivity",
      "Behavioural patterns",
    ],
    goal: "The goal is not to view digestion separately, but to understand its relationship with brain, behaviour and emotional wellbeing.",
  },
  {
    icon: Activity,
    no: "Pillar 03",
    title: "Neural Network System",
    desc: "The Neural Network System focuses on learning pathways, adaptation, processing and developmental growth. This pillar looks at how individuals learn, respond, process information, adapt to changes and develop new skills over time.",
    points: [
      "Autism",
      "ADHD",
      "Learning difficulties",
      "Developmental delays",
      "Speech and communication concerns",
      "Cognitive and behavioural growth",
    ],
    goal: "The goal is to understand how learning and developmental pathways can be supported in a structured way.",
  },
  {
    icon: Sparkles,
    no: "Pillar 04",
    title: "Sensory Integration System",
    desc: "The Sensory Integration System focuses on how an individual receives, processes and responds to sensory information from the environment. Some children may become overwhelmed by sound, light, touch, crowds, textures or changes in routine. Others may seek more sensory input through movement, jumping, spinning or repetitive behaviours.",
    points: [
      "Autism",
      "Sensory processing concerns",
      "Emotional outbursts",
      "Meltdowns",
      "Behavioural concerns",
      "School-related difficulties",
    ],
    goal: "The goal is to understand how sensory experiences may influence behaviour, communication, emotional regulation and daily functioning.",
  },
  {
    icon: Users,
    no: "Pillar 05",
    title: "Behaviour Guidance System",
    desc: "The Behaviour Guidance System focuses on understanding behaviour as communication. A child who hits, screams, refuses instructions, avoids school or has frequent emotional outbursts may not simply be misbehaving. Behaviour may reflect frustration, communication difficulty, emotional overwhelm, sensory overload, attention challenges or developmental needs.",
    points: [
      "Aggressive behaviour",
      "Temper tantrums",
      "Defiant behaviour",
      "School refusal",
      "Attention-seeking behaviour",
      "Emotional outbursts",
      "Parent-child challenges",
    ],
    goal: "The goal is to help families understand what the behaviour may be communicating and how development can be supported more effectively.",
  },
];

export default function CoreDevelopmentPillars() {
  return (
    <section className="w-full bg-[#f7f1e8] py-8 md:py-10">
      <div className="mx-auto max-w-full px-5 md:px-10">
        <p className="mb-3 text-[12px] uppercase tracking-[0.42em] text-[#d98923]">
          The Five Pillars
        </p>

        <h2 className="mb-4 font-serif text-[28px] leading-[1.15] tracking-[-0.03em] text-[#002b18] sm:text-[30px] md:text-[36px]">
          The Five Pillars Of The Neuro-Ayurveda Development System&trade;
        </h2>

        <p className="mb-8 max-w-[820px] text-[15px] leading-[1.65] text-[#2f3f4a]">
          The system is based on five interconnected pillars.
        </p>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
          {pillars.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.no}
                className="min-h-[168px] rounded-[10px] border border-[#dedbd3] bg-white px-6 py-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-[8px] bg-[#e8eeeb]">
                    <Icon size={18} strokeWidth={2} className="text-[#004124]" />
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] uppercase tracking-[0.36em] text-[#d98923]">
                      {item.no}
                    </p>

                    <h3 className="font-serif text-[20px] leading-snug text-[#002b18]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-[15px] leading-[1.65] text-[#2f3f4a]">
                  {item.desc}
                </p>

                <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#002b18]">
                  Especially important in:
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {item.points.map((point) => (
                    <p key={point} className="text-[14px] leading-[1.45] text-[#4b5b55]">
                      {point}
                    </p>
                  ))}
                </div>

                <p className="mt-4 text-[14px] font-medium leading-[1.6] text-[#2f3f4a]">
                  {item.goal}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
