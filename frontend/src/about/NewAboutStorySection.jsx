import React from "react";
import {
  BriefcaseBusiness,
  Eye,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

const aboutBullets = [
  "Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and developer of the Neuro-Ayurveda Development System. He has 7+ years of focused experience in child development and mental wellness. His PhD research explores the relationship between the gut–brain axis, behaviour and emotional wellbeing.",
  "His work focuses on helping children, teenagers, adults and families better understand the factors influencing development, behaviour, emotional wellbeing and long-term health.",
  "Over the years, he has worked with individuals and families seeking guidance for concerns related to Autism Spectrum Disorder (ASD), ADHD, developmental delays, behavioural challenges, emotional wellbeing, stress-related concerns and mind-body health issues.",
  "His approach is based on the understanding that development, behaviour and wellbeing are influenced by multiple interconnected factors rather than a single isolated symptom.",
  "This philosophy eventually led to the development of the Neuro-Ayurveda Development System, which forms the foundation of his current work.",
];

const journeyIntro =
  "Throughout his professional journey, Dr Ankush Garg observed that many developmental, behavioural and emotional concerns often involve multiple interconnected influences.";

const journeyBullets = [
  "Developmental concerns may involve communication, sensory processing and behavioural factors.",
  "Emotional challenges may involve stress, sleep, lifestyle habits and coping patterns.",
  "Behavioural concerns may be influenced by emotional regulation, learning difficulties and environmental factors.",
];

const journeyClosing = [
  "These observations reinforced the importance of looking beyond symptoms and understanding the broader factors that may influence an individual's overall wellbeing.",
  "This perspective continues to guide his work with children, teenagers, adults and families today.",
];

const focusAreas = [
  {
    icon: UsersRound,
    title: "Child Development",
    desc: "Supporting children with developmental, behavioural, communication and learning-related concerns.",
    href: "https://manovaidya.org/child-health-care",
    tone: "bg-[#eef7f1] text-[#166b56]",
  },
  {
    icon: ShieldCheck,
    title: "Behavioural Concerns",
    desc: "Helping families better understand emotional regulation, behaviour patterns and developmental challenges.",
    href: "https://manovaidya.org/women-health-care",
    tone: "bg-[#fbf7ed] text-[#b27728]",
  },
  {
    icon: Sparkles,
    title: "Teen Mental Wellness",
    desc: "Supporting emotional wellbeing, confidence, academic stress and healthy development during adolescence.",
    href: "https://manovaidya.org/teen-mental-wellness",
    tone: "bg-[#eef5fb] text-[#3b7491]",
  },
  {
    icon: HeartPulse,
    title: "Adult Mental Health",
    desc: "Helping individuals address stress, anxiety, emotional wellbeing and lifestyle-related concerns.",
    href: "https://manovaidya.org/adult-mental-wellness",
    tone: "bg-[#fff6ed] text-[#aa6c28]",
  },
  {
    icon: Leaf,
    title: "Mind & Body Health",
    desc: "Understanding the relationship between emotional wellbeing, lifestyle and overall health.",
    href: "https://manovaidya.org/mind-body-wellbeing",
    tone: "bg-[#edf8f3] text-[#075640]",
  },
  {
    icon: BriefcaseBusiness,
    title: "Senior Mental Wellness",
    desc: "Supporting seniors with emotional wellbeing, lifestyle balance, stress-related concerns and long-term health guidance.",
    href: "https://manovaidya.org/senior-mind-memory-care",
    tone: "bg-[#f7f1fb] text-[#775688]",
  },
];

function BulletList({ items }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[14px] font-medium leading-[1.75] text-[#3d4d46]">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#74a76e]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function NewAboutStorySection() {
  return (
    <section id="about-manovaidya" className="bg-white px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto ">
        <div className="grid gap-10 border-b border-[#e9e5dc] pb-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#edf6ef] text-[#075640]">
                <UsersRound size={22} />
              </div>
              <h2 className="font-serif text-[27px] font-semibold text-[#075640]">
                Who Is Dr Ankush Garg?
              </h2>
            </div>
            <BulletList items={aboutBullets} />
          </div>

          <div className="border-t border-[#e9e5dc] pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <h2 className="font-serif text-[27px] font-semibold text-[#075640]">
              Mission &amp; Vision
            </h2>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[10px] bg-[#f7f8f2] p-8">
                <Target className="mb-5 text-[#075640]" size={34} />
                <h3 className="text-[18px] font-bold text-[#075640]">Our Mission</h3>
                <p className="mt-5 text-[15px] font-medium leading-[1.85] text-[#45544e]">
                  To help children, teenagers, adults and families better
                  understand the factors influencing development, behaviour,
                  emotional wellbeing and overall health through structured
                  assessment, education and personalized guidance.
                </p>
              </div>
              <div className="rounded-[10px] bg-[#f7f8f2] p-8">
                <Eye className="mb-5 text-[#075640]" size={34} />
                <h3 className="text-[18px] font-bold text-[#075640]">Our Vision</h3>
                <p className="mt-5 text-[15px] font-medium leading-[1.85] text-[#45544e]">
                  To increase awareness about the relationship between brain
                  health, behaviour, emotional wellbeing, lifestyle and
                  development while making holistic health concepts easier to
                  understand and apply in everyday life.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-10 pt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#edf6ef] text-[#075640]">
                <BriefcaseBusiness size={22} />
              </div>
              <h2 className="font-serif text-[27px] font-semibold text-[#075640]">
                Professional Journey
              </h2>
            </div>
            <p className="mb-4 text-[14px] font-medium leading-[1.75] text-[#3d4d46]">
              {journeyIntro}
            </p>
            <p className="mb-4 text-[14px] font-bold leading-[1.75] text-[#075640]">
              For example:
            </p>
            <BulletList items={journeyBullets} />
            <div className="mt-5 space-y-4">
              {journeyClosing.map((item) => (
                <p key={item} className="text-[14px] font-medium leading-[1.75] text-[#3d4d46]">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="border-t border-[#e9e5dc] pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div className="mb-6 flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#edf6ef] text-[#075640]">
                <Sparkles size={22} />
              </div>
              <h2 className="font-serif text-[27px] font-semibold text-[#075640]">
                Areas Of Focus
              </h2>
            </div>
            <p className="mb-5 text-[14px] font-medium leading-[1.75] text-[#3d4d46]">
              Dr Ankush Garg currently works in the following areas:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {focusAreas.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex min-h-[118px] items-start gap-3 rounded-[9px] bg-[#fbfaf6] p-4 shadow-[0_10px_24px_rgba(5,54,39,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(5,54,39,0.08)]"
                  >
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${item.tone}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold leading-[1.45] text-[#273931]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[13px] font-medium leading-[1.6] text-[#5b6962]">
                        {item.desc}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
            <a
              href="https://manovaidya.org/child-health-care"
              className="mt-7 inline-flex text-[15px] font-bold text-[#075640] transition hover:text-[#0a7a5b]"
            >
              Explore All Areas Of Expertise →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
