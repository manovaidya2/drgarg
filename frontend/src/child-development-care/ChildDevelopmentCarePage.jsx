import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Baby,
  Brain,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  HeartHandshake,
  HelpCircle,
  MessageCircle,
  Puzzle,
  School,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";
import doctorHeroBanner from "../images/2.jpg.jpeg";
import consultationImage from "../images/family-consultation-neuro-ayurveda.png";
import ConsultationPopup from "../components/ConsultationPopup";

const heroSupportAreas = [
  { label: "Autism Support", icon: Brain },
  { label: "ADHD Support", icon: Sparkles },
  { label: "Child Development", icon: Baby },
  { label: "Teen Mental Wellness", icon: School },
  { label: "Adult Mental Health", icon: HeartHandshake },
  { label: "Mind and Memory Care", icon: ShieldCheck },
];

const authorityPoints = [
  { title: "Founder of", text: "Manovaidya", icon: ShieldCheck },
  {
    title: "Creator of",
    text: "Neuro-Ayurveda Development System",
    icon: Brain,
  },
  { title: "7+ Years of", text: "Focused Experience", icon: CalendarCheck },
  { title: "Trusted by Families", text: "Across India", icon: Users },
];

const expertiseAreas = [
  {
    title: "Child Development Support",
    desc: "Autism, ADHD, speech and communication challenges, learning difficulties and behavioural concerns.",
    icon: Baby,
    color: "#064834",
    bg: "#e7f2ed",
  },
  {
    title: "Teen Mental Wellness",
    desc: "Stress, anxiety, depression, confidence, screen dependency and emotional wellbeing.",
    icon: School,
    color: "#5e9f47",
    bg: "#eaf8e7",
  },
  {
    title: "Adult Mental Health",
    desc: "Anxiety, depression, stress, sleep challenges and emotional wellbeing.",
    icon: Brain,
    color: "#ef8b32",
    bg: "#fff0df",
  },
  {
    title: "Women Mental Health",
    desc: "Hormonal mood changes, emotional wellbeing and life transition support.",
    icon: HeartHandshake,
    color: "#e75c9f",
    bg: "#ffe8f3",
  },
  {
    title: "Senior Mind and Memory Care",
    desc: "Memory concerns, dementia, cognitive health and emotional wellbeing support.",
    icon: Users,
    color: "#4a82d6",
    bg: "#e8f1ff",
  },
  {
    title: "Mind and Body Concerns",
    desc: "Migraine, sleep issues, gut-brain health and stress-related physical symptoms.",
    icon: Sprout,
    color: "#0d9a84",
    bg: "#ddfaf5",
  },
];

const supportCards = [
  {
    title: "Children",
    desc: "Development, behaviour, learning and communication support.",
    image: consultationImage,
  },
  {
    title: "Teenagers",
    desc: "Confidence, motivation, emotional wellbeing and growth.",
    image: consultationImage,
  },
  {
    title: "Adults",
    desc: "Mental wellness, emotional health and lifestyle challenges.",
    image: consultationImage,
  },
  {
    title: "Women",
    desc: "Emotional wellbeing, hormone changes and life transitions.",
    image: consultationImage,
  },
  {
    title: "Seniors",
    desc: "Memory, cognitive health and emotional wellbeing support.",
    image: consultationImage,
  },
];

const results = [
  "Understanding Autism",
  "Understanding ADHD",
  "Child Development Milestones",
  "Teen Mental Wellness",
  "Adult Mental Health",
  "Memory and Cognitive Wellness",
];

const trustPoints = [
  "Structured assessments",
  "Personalized guidance",
  "Family-centered support",
  "Long-term development focus",
  "Practical recommendations",
  "Compassionate care",
];

const faqs = [
  {
    q: "Who is Dr. Ankush Garg?",
    a: "Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and developer of the Neuro-Ayurveda Development System. He has 7+ years of focused experience in child development and mental wellness. His ongoing PhD research explores the relationship between the gut–brain axis, behaviour and emotional wellbeing.",
  },
  {
    q: "What does Dr. Ankush Garg specialize in?",
    a: "His work focuses on child development, autism, ADHD, speech delay, learning difficulties, behavioural concerns and mental wellness across life stages.",
  },
  {
    q: "Does Dr. Ankush Garg support Autism and ADHD?",
    a: "Yes. He provides structured assessment, family guidance and personalized support for Autism, ADHD and related developmental or behavioural challenges.",
  },
  {
    q: "How does Neuro-Ayurveda System help children?",
    a: "It helps families understand developmental, behavioural, emotional and wellbeing factors together, then builds a practical roadmap for long-term support.",
  },
  {
    q: "Can adults seek mental wellness support?",
    a: "Yes. Along with child development care, support is available for adults, teenagers, women and seniors dealing with mental wellness or mind-body concerns.",
  },
  {
    q: "What is the Neuro-Ayurveda Development System?",
    a: "It is a structured framework combining modern neuroscience, Ayurvedic understanding and personalized guidance for development, behaviour and wellbeing.",
  },
];

export default function ChildDevelopmentCarePage() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <>
      <Helmet>
        <title>Child Development Care | Dr. Ankush Garg</title>
        <meta
          name="description"
          content="Child development care for Autism, ADHD, speech delay, learning difficulties and behavioural challenges by Dr. Ankush Garg."
        />
        <link
          rel="canonical"
          href="https://drankushgarg.in/child-development-care"
        />
      </Helmet>

      <link
        rel="preload"
        as="image"
        href={doctorHeroBanner}
        fetchPriority="high"
      />

      <main className="bg-[#f6faf8] text-[#241432]">
        <section className="relative mx-auto min-h-[690px] w-full overflow-hidden px-4 py-5 sm:min-h-[720px] sm:px-6 sm:py-8 lg:min-h-[560px] lg:px-[42px] lg:py-10">
          <div className="absolute inset-0">
            <img
              src={doctorHeroBanner}
              alt="Dr. Ankush Garg child development care banner"
              className="h-full w-full object-cover object-[63%_center] sm:object-[68%_center] lg:object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="relative z-10 grid min-h-[650px] grid-cols-1 items-start gap-6 sm:min-h-[680px] sm:gap-8 lg:min-h-[500px] lg:block">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-[670px] pt-4 text-center lg:mx-0 lg:pt-0 lg:text-left"
            >
              <h1 className="text-[34px] font-bold leading-[1.02] text-[#064834] min-[390px]:text-[37px] sm:text-[49px] md:text-[57px] lg:text-[59px] xl:text-[41px]">
                <span className="block text-[#161126]">Dr. Ankush Garg -</span>
                Child Development and Mental Wellness Specialist in India
              </h1>
              <p className="mx-auto mt-4 max-w-[560px] text-[14.5px] font-medium leading-[1.6] text-[#4e4658] sm:text-[17px] lg:mx-0 xl:text-[16px]">
                Supporting children, teenagers, adults and families through
                structured assessments, personalized guidance and long-term
                wellbeing support.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:grid-cols-3 lg:max-w-[620px]">
                {heroSupportAreas.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-white/82 px-2.5 text-[11.5px] font-semibold leading-tight text-[#4c4160] shadow-sm ring-1 ring-[#d4e4dc]/70 sm:h-[40px] sm:rounded-none sm:bg-transparent sm:px-2 sm:text-[12px] sm:shadow-none sm:ring-0 sm:justify-start lg:border-r lg:border-[#d4e4dc] lg:last:border-r-0 xl:text-[13px]"
                  >
                    <Icon size={18} className="shrink-0 text-[#064834]" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <button
                  onClick={() => setOpenPopup(true)}
                  className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#064834] px-7 text-[13px] font-semibold text-white shadow-[0_16px_36px_rgba(6,72,52,0.25)] transition hover:bg-[#053b2b] sm:h-[46px] sm:w-auto"
                >
                  Book Assessment
                  <CalendarCheck size={16} />
                </button>
                <a
                  href="#areas"
                  className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[6px] border border-[#7aa08f] bg-white/86 px-7 text-[13px] font-semibold text-[#064834] transition hover:bg-white sm:h-[46px] sm:w-auto"
                >
                  Explore Areas of Expertise
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#064834]/88 px-3.5 py-2 text-[12px] font-medium text-white shadow-sm sm:px-4 sm:text-[13px]">
                  <span className="relative flex h-[9px] w-[9px]">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-[9px] w-[9px] rounded-full bg-red-500" />
                  </span>
                  Child development assessments available
                </div>

                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/92 px-3.5 py-2 text-[12px] font-semibold text-[#33283f] shadow-sm ring-1 ring-[#d7e6df] sm:px-4 sm:text-[13px]">
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[13px] font-bold shadow-sm">
                    <span className="text-[#4285f4]">G</span>
                  </span>
                  <span>4.9 Google Reviews</span>
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              className="mx-auto mt-1 w-full max-w-[250px] rounded-[14px] border border-white/70 bg-white/92 p-2.5 shadow-[0_22px_55px_rgba(6,72,52,0.16)] backdrop-blur-md sm:mt-auto sm:max-w-[220px] lg:absolute lg:right-[-18px] lg:top-1/2 lg:mt-0 lg:w-[220px] lg:max-w-none lg:-translate-y-[calc(50%+140px)] xl:right-[-10px] 2xl:right-0"
            >
              <h2 className="mb-2.5 text-[14px] font-bold text-[#33283f]">
                Meet Dr. Ankush Garg
              </h2>
              <div className="grid gap-1.5">
                {authorityPoints.map(({ title, text, icon: Icon }) => (
                  <div
                    key={`${title}-${text}`}
                    className="grid grid-cols-[28px_1fr] items-center gap-2 border-b border-[#dce8e2] pb-2 last:border-b-0 last:pb-0"
                  >
                    <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[#e7f2ec] text-[#064834]">
                      <Icon size={16} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold leading-snug text-[#33283f]">
                        {title}
                      </p>
                      <p className="text-[11px] font-medium leading-snug text-[#6a5c78]">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="bg-white px-4 py-7 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[0.82fr_1fr]">
            <div className="overflow-hidden rounded-[8px] shadow-[0_16px_42px_rgba(69,45,91,0.12)]">
              <img
                src={consultationImage}
                alt="Doctor helping child and family"
                className="h-[260px] w-full object-cover sm:h-[300px]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#064834]">
                About Dr. Ankush Garg
              </p>
              <h2 className="mt-2 font-serif text-[27px] font-semibold leading-tight text-[#261636] sm:text-[34px]">
                Helping Individuals and Families Move From Confusion To Clarity
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-[1.7] text-[#5d5168]">
                Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and
                developer of the Neuro-Ayurveda Development System. He has 7+
                years of focused experience in child development and mental
                wellness. His ongoing PhD research explores the relationship
                between the gut–brain axis, behaviour and emotional wellbeing.
              </p>
              <p className="mt-3 text-[15px] font-medium leading-[1.7] text-[#5d5168]">
                His work focuses on understanding developmental, behavioural,
                emotional and wellbeing-related concerns through structured
                assessments, personalized guidance and long-term support.
              </p>
              <Link
                to="/about"
                className="mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-[6px] bg-[#064834] px-5 text-[13px] font-bold text-white transition hover:bg-[#053b2b]"
              >
                Learn More About Dr. Ankush Garg
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section id="areas" className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px] rounded-[8px] bg-white p-5 shadow-[0_18px_55px_rgba(69,45,91,0.09)] sm:p-6">
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#064834]">
                Areas of Expertise
              </p>
              <h2 className="font-serif text-[28px] font-semibold leading-tight text-[#261636] sm:text-[36px]">
                Comprehensive Care For Every Stage Of Life
              </h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {expertiseAreas.map(({ title, desc, icon: Icon, color, bg }) => (
                <article
                  key={title}
                className="flex min-h-[218px] flex-col items-center rounded-[8px] border border-[#dce8e2] bg-white px-4 py-5 text-center shadow-sm"
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ color, backgroundColor: bg }}
                  >
                    <Icon size={28} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-3 min-h-[42px] text-[14px] font-bold leading-tight text-[#2d1f3d]">
                    {title}
                  </h3>
                  <p className="mt-2 flex-1 text-[12px] font-medium leading-[1.45] text-[#665a70]">
                    {desc}
                  </p>
                  <Link
                    to="/appointment"
                    className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-[#064834]"
                  >
                    Learn More
                    <ArrowRight size={12} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1240px] gap-5 lg:grid-cols-[1.35fr_0.9fr]">
            <div className="relative overflow-hidden rounded-[8px] bg-[#064834] p-6 text-white shadow-[0_20px_50px_rgba(6,72,52,0.24)] sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#cfe4da]">
                Our Unique Approach
              </p>
              <h2 className="mt-2 font-serif text-[30px] font-semibold leading-tight sm:text-[38px]">
                The Neuro-Ayurveda Development System
              </h2>
              <p className="mt-4 max-w-[720px] text-[14px] font-medium leading-[1.75] text-[#f4ecff]">
                A structured framework that combines modern neuroscience,
                Ayurvedic wisdom and personalized support to understand the
                root factors and create a structured roadmap for long-term
                development and wellbeing.
              </p>
              <Link
                to="/neuro-ayurveda-system"
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-[6px] bg-white px-5 text-[13px] font-bold text-[#064834]"
              >
                Explore Our Approach
                <ArrowRight size={15} />
              </Link>

              <div className="mt-7 grid max-w-[520px] gap-3 sm:grid-cols-3">
                {["Modern Neuroscience", "Ayurveda Wisdom", "Personalized Support"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-[8px] border border-white/20 bg-white/10 px-3 py-4 text-center"
                    >
                      <ShieldCheck className="mx-auto" size={24} />
                      <p className="mt-2 text-[12px] font-bold leading-tight">
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="rounded-[8px] bg-white p-6 shadow-[0_18px_55px_rgba(69,45,91,0.09)]">
              <h2 className="font-serif text-[24px] font-semibold leading-tight text-[#261636]">
                Why Families Trust Dr. Ankush Garg
              </h2>
              <ul className="mt-5 space-y-3">
                {trustPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[14px] font-semibold text-[#4b4057]"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#064834]"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#064834]">
              Who We Support
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {supportCards.map((card) => (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-[8px] border border-[#dce8e2] bg-white shadow-[0_12px_32px_rgba(6,72,52,0.08)]"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-[120px] w-full object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-[15px] font-bold text-[#261636]">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-[12px] font-medium leading-[1.45] text-[#665a70]">
                      {card.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="rounded-[8px] bg-white p-6 shadow-[0_18px_55px_rgba(69,45,91,0.09)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#064834]">
              Results, Awareness and Guidance
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {results.map((item) => (
                <div
                  key={item}
                  className="rounded-[8px] border border-[#dce8e2] bg-[#f6faf8] px-3 py-4 text-center"
                >
                  <Puzzle className="mx-auto text-[#064834]" size={24} />
                  <p className="mt-2 text-[12px] font-bold leading-tight text-[#332443]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] bg-white p-6 shadow-[0_18px_55px_rgba(69,45,91,0.09)]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#064834]">
                Common Questions
              </p>
              <Link
                to="/blog"
                className="text-[12px] font-bold text-[#064834] hover:text-[#053b2b]"
              >
                View All FAQs
              </Link>
            </div>
            <div className="mt-4 space-y-2">
              {faqs.map((item, index) => {
                const isOpen = openFaqIndex === index;

                return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-[8px] border border-[#dce8e2] bg-[#f6faf8]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-start gap-3">
                    <HelpCircle
                      className="mt-0.5 shrink-0 text-[#064834]"
                      size={18}
                    />
                      <span className="text-[13px] font-bold text-[#064834]">
                        {item.q}
                      </span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`mt-0.5 shrink-0 text-[#064834] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pl-[50px]">
                      <p className="mt-1 text-[12px] font-medium leading-[1.55] text-[#4d5d56]">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-4 rounded-[8px] bg-[#064834] p-6 text-white shadow-[0_20px_50px_rgba(6,72,52,0.24)] sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#cfe4da]">
                Looking For Clarity, Guidance and a Structured Roadmap?
              </p>
              <h2 className="mt-2 font-serif text-[26px] font-semibold leading-tight">
                Book a child development assessment with Dr. Ankush Garg.
              </h2>
            </div>
            <Link
              to="/appointment"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[6px] bg-white px-5 text-[13px] font-bold text-[#064834]"
            >
              <MessageCircle size={16} />
              Book Assessment
            </Link>
          </div>
        </section>
      </main>

      <ConsultationPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </>
  );
}
