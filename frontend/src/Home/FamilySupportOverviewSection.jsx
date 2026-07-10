import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Baby,
  Brain,
  Check,
  FileHeart,
  HeartHandshake,
  HeartPulse,
  Puzzle,
  School,
  ShieldAlert,
  Sparkles,
  UserRoundX,
} from "lucide-react";
import consultationImage from "../images/family-consultation-neuro-ayurveda.png";

const concerns = [
  { label: "Autism", icon: FileHeart, color: "#8e57c8", bg: "#f0e7fb" },
  { label: "ADHD", icon: Brain, color: "#66a95b", bg: "#e8f4e3" },
  { label: "Speech Delay", icon: Baby, color: "#4b9bd3", bg: "#e5f3ff" },
  {
    label: "Learning Difficulties",
    icon: Puzzle,
    color: "#8d5ac9",
    bg: "#f1e8fb",
  },
  {
    label: "Behaviour Problems",
    icon: ShieldAlert,
    color: "#557fae",
    bg: "#eaf1fb",
  },
  {
    label: "Anxiety & Stress",
    icon: HeartPulse,
    color: "#8d4fc2",
    bg: "#f2e8fb",
  },
  {
    label: "Emotional Regulation",
    icon: HeartHandshake,
    color: "#eba45f",
    bg: "#fff0df",
  },
  {
    label: "School Refusal",
    icon: School,
    color: "#8e57c8",
    bg: "#f0e7fb",
  },
];

const choicePoints = [
  "In-depth Structured Assessments",
  "Neuro-Ayurveda Development System",
  "Personalized Care Plans",
  "Parent Guidance & Training",
  "Long-Term Follow-Up & Support",
];

export default function FamilySupportOverviewSection() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#064834]">
            Common Concerns We Support
          </p>
          <h2 className="mt-2 text-[26px] font-semibold leading-tight text-[#111111] sm:text-[32px] lg:text-[36px]">
            We Understand. We Support. We Guide.
          </h2>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9">
          {concerns.map(({ label, icon: Icon, color, bg }) => (
            <article
              key={label}
              className="flex min-h-[104px] flex-col items-center justify-center rounded-[8px] border border-[#dce8e2] bg-white px-3 py-4 text-center shadow-[0_7px_18px_rgba(6,72,52,0.06)]"
            >
              <div
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full"
                style={{ backgroundColor: bg, color }}
              >
                <Icon size={22} strokeWidth={1.9} />
              </div>
              <h3 className="mt-3 text-[13px] font-semibold leading-[1.25] text-[#111111]">
                {label}
              </h3>
            </article>
          ))}

          <article className="flex min-h-[104px] flex-col items-center justify-center rounded-[8px] bg-[#064834] px-3 py-4 text-center text-white shadow-[0_10px_22px_rgba(6,72,52,0.2)]">
            <Sparkles size={22} strokeWidth={1.9} />
            <h3 className="mt-3 text-[13px] font-semibold leading-[1.25]">
              And Many
              <br />
              More...
            </h3>
          </article>
        </div>

        <div className="mt-7 grid items-stretch gap-5 lg:grid-cols-[0.9fr_1.35fr_1.25fr]">
          <div className="rounded-[10px] bg-white p-1">
            <p className="text-[12px] font-semibold uppercase tracking-[0.07em] text-[#064834]">
              Why Families Choose
            </p>
            <h3 className="mt-1 text-[28px] font-semibold leading-tight text-[#064834] sm:text-[32px]">
              Dr. Ankush Garg
            </h3>

            <ul className="mt-5 space-y-3">
              {choicePoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[14px] font-medium leading-snug text-[#111111]"
                >
                  <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#67aa59] text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[12px] border border-[#dce8e2] bg-white shadow-[0_9px_24px_rgba(6,72,52,0.08)]">
            <img
              src={consultationImage}
              alt="Dr. Ankush Garg consulting with a child and parent"
              className="h-full min-h-[260px] w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="rounded-[12px] border border-[#dce8e2] bg-white p-6 shadow-[0_9px_24px_rgba(6,72,52,0.06)]">
            <h3 className="text-[24px] font-semibold leading-tight text-[#064834] sm:text-[28px]">
              About Dr. Ankush Garg
            </h3>
            <p className="mt-4 text-[14px] font-medium leading-[1.65] text-[#4d5d56]">
              Dr. Ankush Garg is a Child Development & Mental Wellness
              Specialist, Founder of Manovaidya and Creator of the
              Neuro-Ayurveda Development System.
            </p>
            <p className="mt-4 text-[14px] font-medium leading-[1.65] text-[#4d5d56]">
              His mission is to help children, teens, adults and families move
              from confusion to clarity, and from challenges to confident,
              emotionally strong and fulfilling lives.
            </p>

            <Link
              to="/about"
              className="mt-5 inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#064834] px-5 text-[14px] font-semibold text-white transition hover:bg-[#053b2b]"
            >
              Read More About Dr. Ankush Garg
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
