import React from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, HeartPulse, Leaf, Sprout, UsersRound } from "lucide-react";
import doctorImage from "../images/White coat.webp";

const stats = [
  { icon: CalendarCheck, value: "15+", label: "Years Experience" },
  { icon: UsersRound, value: "Thousands", label: "of Patients Treated" },
  { icon: Leaf, value: "Holistic", label: "Ayurvedic Care" },
];

export default function NewAboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#fbf8f1]">
      <div className="absolute left-[48%] top-20 hidden h-64 w-64 rounded-full bg-[#dce8d8] lg:block" />
      <div className="absolute right-12 top-36 hidden text-[#b9cdb8] opacity-60 lg:block">
        <Sprout size={138} strokeWidth={1.2} />
      </div>
      <div className="absolute left-[44%] bottom-12 hidden text-[#b9cdb8] opacity-60 lg:block">
        <Sprout size={120} strokeWidth={1.2} />
      </div>

      <div className="relative mx-auto grid  items-center gap-8 px-5  sm:px-8 lg:grid-cols-[1.08fr_0.9fr_170px] lg:px-12 -">
        <div className="max-w-[620px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6d58]">
              About
            </span>
            <span className="h-px w-12 bg-[#d8b46a]" />
          </div>

          <h1 className="font-serif text-[36px] font-bold leading-[1.12] text-[#075640] sm:text-[48px] lg:text-[42px]">
            About Dr Ankush Garg
          </h1>

          <p className="mt-6 text-[18px] font-semibold leading-[1.45] text-[#20332c] sm:text-[21px]">
            Autism, ADHD, Child Development &amp; Mental Wellness Specialist In India
          </p>

          <p className="mt-7 max-w-[575px] text-[15px] font-medium leading-[1.9] text-[#4b5b54] sm:text-[16px]">
            Supporting children, teenagers, adults and families through
            structured assessment, personalized guidance and the Neuro-Ayurveda
            Development System.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/appointment"
              className="inline-flex h-[54px] items-center justify-center gap-3 rounded-[5px] bg-[#075640] px-7 text-[13px] font-bold uppercase tracking-[0.03em] text-white shadow-sm transition hover:bg-[#064834]"
            >
              <HeartPulse size={17} />
              Book A Consultation
            </Link>
            <Link
              to="/neuro-ayurveda-system"
              className="inline-flex h-[54px] items-center justify-center rounded-[5px] border border-[#91b9aa] bg-white/70 px-7 text-[13px] font-bold uppercase tracking-[0.03em] text-[#075640] transition hover:bg-[#edf6ef]"
            >
              Explore The System
            </Link>
          </div>
        </div>

        <div className="relative mx-auto -mb-8 flex min-h-[330px] w-full max-w-[440px] items-end justify-center sm:mb-0 sm:min-h-[420px] lg:min-h-[520px]">
          <div className="absolute bottom-0 h-[320px] w-[320px] rounded-full bg-[#dce8d8] sm:h-[450px] sm:w-[450px]" />
          <img
            src={doctorImage}
            alt="Dr. Ankush Garg"
            className="relative z-10 max-h-[350px] w-auto object-contain sm:max-h-[520px]"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-[10px] border border-[#e8e6dd] bg-white/90 p-3 text-center shadow-[0_8px_18px_rgba(5,54,39,0.05)]"
              >
                <div className="mx-auto mb-2 grid h-8 w-8 place-items-center rounded-full bg-[#edf6ef] text-[#075640]">
                  <Icon size={17} />
                </div>
                <p className="text-[15px] font-semibold leading-tight text-[#075640]">
                  {item.value}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-[1.35] text-[#35463f]">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
