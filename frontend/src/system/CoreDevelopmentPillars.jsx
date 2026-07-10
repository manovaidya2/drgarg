import React from "react";
import { Activity, Brain, Leaf, Sparkles, Users } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Brain Nourishment System",
    desc: [
      "This pillar focuses on developing nourishing foundations for the support of attention, learning, emotional and cognitive balance.",
      "Development is focused on brain function as influenced by nourishment, routine, sleep, lifestyle, and wellbeing.",
    ],
    focusLabel: "This pillar is of primary importance for concerns related to:",
    points: [
      "Difficulties with attention",
      "Learning problems",
      "Emotional difficulties",
      "Developmental growth",
      "Stress and overthinking",
    ],
    objective:
      "It is targeted to help determine if the brain is receiving the needed support for stable functioning, learning, and emotional balance.",
  },
  {
    icon: Leaf,
    title: "Gut Response System",
    desc: [
      "This pillar focuses on the relationship between digestion, nutrition, gut comfort, and overall wellbeing.",
      "Gut discomfort, eating habits, and daily routines can influence mood, energy, and behavior in both children and adults.",
    ],
    focusLabel: "This pillar focuses on:",
    points: [
      "Gut-brain connection",
      "Stress-induced digestive issues",
      "Food habits",
      "Energy",
      "Emotional and Behavioral Sensitivity",
    ],
    objective:
      "The objective is to find the connection between the digestive system and the brain and emotions, rather than looking at digestion in isolation.",
  },
  {
    icon: Activity,
    title: "Neural Network System",
    desc: [
      "The Neural Network System focuses on learning pathways and the system's ability to adjust and grow.",
      "This system looks at the individual's ability to learn, respond, process, adapt, and develop over time.",
    ],
    focusLabel: "This system is important in:",
    points: [
      "Autism",
      "ADHD",
      "Learning and Developmental Disorders",
      "Speech and Communication concerns",
      "Cognitive and Behavioral Growth",
    ],
    objective:
      "This system's objective is to create adaptive and learning structures to develop the system pathways.",
  },
  {
    icon: Sparkles,
    title: "Sensory Integration System",
    desc: [
      "The Sensory Integration System looks at how individuals process and react to stimuli in their environment.",
      "While some children are overwhelmed by auditory stimuli, others may be overwhelmed by touch, crowds, or routine disruption. Some children may need additional stimuli and may jump, spin, or engage in repetitive behaviors.",
    ],
    focusLabel: "This system focuses on:",
    points: [
      "Autism",
      "Sensory processing concerns",
      "Emotional outbursts",
      "Meltdowns",
      "Behavioural concerns",
      "School-related difficulties",
    ],
    objective:
      "The goal of the system is to understand how behaviors and emotional and sensory regulation impacts daily functioning.",
  },
  {
    icon: Users,
    title: "Behavior Guidance System",
    desc: [
      "The Behavior Guidance System focuses on the premise that behavior is a form of communication.",
      'Children may not be "bad" when they hit, scream, refuse instructions, try to get out of going to school or when they have emotional outbursts. It may be their way of showing they have frustration, communication difficulties, emotional or sensory overwhelm, trouble focusing or other developmental challenges.',
    ],
    focusLabel: "This pillar is most relevant for the following behaviors:",
    points: [
      "Aggressive behavior",
      "Tantrums",
      "Defiance",
      "Refusal to attend school",
      "Attention-seeking",
      "Emotional outbursts",
      "Parent-child conflict",
    ],
    objective:
      "The aim is to improve the ability to recognize the message behind the behavior and to understand the further developmental needs of the child.",
  },
];

export default function CoreDevelopmentPillars() {
  return (
    <section id="five-pillars" className="w-full scroll-mt-24 bg-[#fbfaf6] py-12 md:py-16">
      <div className="mx-auto px-4 md:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#075640] shadow-sm">
            The Five Pillars
          </div>
          <h2 className="font-serif text-[24px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#075640] sm:text-[28px] md:text-[32px]">
            The Five Pillars Of The Neuro-Ayurveda Development System&trade;
          </h2>
          <p className="mt-4 text-[15px] font-medium leading-[1.7] text-[#5b6962]">
            The system consists of five interrelated pillars.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pillars.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex min-w-0 flex-col rounded-[14px] border border-[#e5e2d9] bg-white p-5 shadow-[0_10px_26px_rgba(5,54,39,0.05)]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#edf6ef] text-[#075640]">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="mt-4 text-[14.5px] font-bold leading-snug text-[#075640]">
                  {index + 1}. {item.title}
                </h3>

                <div className="mt-2.5 space-y-2.5 text-[12.5px] leading-[1.6] text-[#5b6962]">
                  {item.desc.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <p className="mt-4 text-[12.5px] font-bold leading-[1.5] text-[#075640]">
                  {item.focusLabel}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex min-w-0 gap-2 text-[12px] font-medium leading-[1.5] text-[#3f5049]">
                      <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#74a76e]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 border-t border-[#e9e5dc] pt-3 text-[12.5px] font-medium italic leading-[1.6] text-[#5b6962]">
                  {item.objective}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
