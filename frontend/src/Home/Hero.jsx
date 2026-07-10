import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  CalendarCheck,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import heroBanner from "../images/dr-ankush-hero-banner-v2.png";
import ConsultationPopup from "../components/ConsultationPopup";

const supportAreas = [
  { label: "Holistic Approach", icon: Brain },
  { label: "Science Based", icon: Sparkles },
  { label: "Personalized Guidance", icon: Users },
  { label: "Long-Term Support", icon: ShieldCheck },
];

const authorityPoints = [
  { title: "Ayurvedacharya", text: "", icon: Brain },
  {
    title: "Child Development &",
    text: "Mental Wellness Specialist",
    icon: Users,
  },
  { title: "10+ Years of", text: "Clinical Experience", icon: CalendarCheck },
  { title: "Trusted by Families", text: "Across India", icon: ShieldCheck },
];

export default function Hero() {
  const [openPopup, setOpenPopup] = useState(false);
  const [liveCount, setLiveCount] = useState(234);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => {
        const increase = Math.floor(Math.random() * 3);
        const decreaseChance = Math.random();
        if (decreaseChance < 0.18 && prev > 230) return prev - 1;
        return prev + increase;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <link rel="preload" as="image" href={heroBanner} fetchPriority="high" />

      <main className="relative overflow-hidden bg-[#f6fbf8]">
        <section className="relative mx-auto min-h-[720px] w-full px-4 py-5 sm:px-6 sm:py-8 lg:min-h-[560px] lg:px-[42px] lg:py-10">
          <div className="absolute inset-0">
            <img
              src={heroBanner}
              alt="Dr. Ankush Garg professional medical banner"
              className="h-full w-full object-cover object-[68%_center] lg:object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/82 to-white/24 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/76 lg:to-white/4" />
          </div>

          <div className="relative z-10 grid min-h-[680px] grid-cols-1 items-start gap-8 lg:min-h-[500px] lg:block">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-[670px] pt-4 text-center lg:pt-0 lg:text-left"
            >
              <p className="text-[21px] font-bold leading-[1.18] text-[#161126] sm:text-[23px] lg:text-[25px] xl:text-[23px]">
                Compassionate. Evidence-Based.
                <br />
                Personalized Care for
              </p>

              <h1 className="mt-2 text-[35px] font-bold leading-[0.98] text-[#064834] sm:text-[49px] md:text-[57px] lg:text-[59px] xl:text-[41px]">
                Child Development &
                <br />
                Mental Wellness
              </h1>

              <p className="mx-auto mt-4 max-w-[560px] text-[16px] font-medium leading-[1.55] text-[#4e4658] sm:text-[17px] lg:mx-0 xl:text-[16px]">
                Helping children, teenagers, adults and families overcome
                developmental, behavioural and emotional challenges through the
                Neuro-Ayurveda Development System.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:max-w-[560px]">
                {supportAreas.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex h-[40px] items-center justify-center gap-2 border-r border-[#d4e4dc] px-2 text-[12px] font-semibold leading-tight text-[#4c4160] last:border-r-0 sm:justify-start xl:text-[13px]"
                  >
                    <Icon size={18} className="shrink-0 text-[#064834]" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <button
                  onClick={() => setOpenPopup(true)}
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[6px] bg-[#064834] px-7 text-[13px] font-semibold text-white shadow-[0_16px_36px_rgba(6,72,52,0.25)] transition hover:bg-[#053b2b]"
                >
                  Book Assessment
                  <CalendarCheck size={16} />
                </button>

                <Link
                  to="/neuro-ayurveda-system"
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[6px] border border-[#7aa08f] bg-white/80 px-7 text-[13px] font-semibold text-[#064834] transition hover:bg-white"
                >
                  Explore Areas of Expertise
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#064834]/88 px-4 py-2 text-[13px] font-medium text-white shadow-sm">
                  <span className="relative flex h-[9px] w-[9px]">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-[9px] w-[9px] rounded-full bg-red-500" />
                  </span>
                  {liveCount}+ live appointments today
                </div>

                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-[13px] font-semibold text-[#33283f] shadow-sm ring-1 ring-[#d7e6df]">
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
              className="mx-auto mt-auto w-full max-w-[220px] rounded-[14px] border border-white/70 bg-white/90 p-2.5 shadow-[0_22px_55px_rgba(6,72,52,0.16)] backdrop-blur-md lg:absolute lg:right-[-18px] lg:top-1/2 lg:mt-0 lg:w-[220px] lg:max-w-none lg:-translate-y-[calc(50%+140px)] xl:right-[-10px] 2xl:right-0"
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
      </main>

      <ConsultationPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </>
  );
}
