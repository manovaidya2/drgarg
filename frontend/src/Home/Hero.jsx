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
import heroBanner from "../images/New.jpg.jpeg";
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
  { title: "7+ Years of", text: "Clinical Experience", icon: CalendarCheck },
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

      <main className="relative overflow-hidden ">
        <section className="relative mx-auto min-h-[690px] w-full px-4 py-5 sm:min-h-[720px] sm:px-6 sm:py-8 lg:min-h-[560px] lg:px-[42px] lg:py-10">
          <div className="absolute inset-0">
            <img
              src={heroBanner}
              alt="Dr. Ankush Garg professional medical banner"
              className="h-full w-full object-cover object-[63%_center] sm:object-[68%_center] lg:object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0  " />
          </div>

          <div className="relative z-10 grid min-h-[650px] grid-cols-1 items-start gap-6 sm:min-h-[680px] sm:gap-8 lg:min-h-[500px] lg:block">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-[670px] pt-4 text-center lg:mx-0 lg:pt-0 lg:text-left"
            >
              <h1 className="text-[34px] font-bold leading-[1.02] text-[#064834] min-[390px]:text-[37px] sm:text-[49px] md:text-[57px] lg:text-[59px] xl:text-[41px]">
                <span className="block text-[#161126]">A New Way to</span>
                Understand Autism,
                <br />
                ADHD & Mental Health
              </h1>

              <p className="mx-auto mt-4 max-w-[560px] text-[14.5px] font-medium leading-[1.6] text-[#4e4658] sm:text-[17px] lg:mx-0 xl:text-[16px]">
                Dr. Ankush Garg, one of India’s leading Ayurvedic Neurologists
                and developer of the Neuro-Ayurveda System, helps children,
                teenagers, adults, and seniors heal complex brain, behaviour,
                and mental health conditions through an integrated
                Brain-Gut-Behaviour approach.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:grid-cols-4 lg:max-w-[560px]">
                {supportAreas.map(({ label, icon: Icon }) => (
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

                <Link
                  to="/neuro-ayurveda-system"
                  className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[6px] border border-[#7aa08f] bg-white/86 px-7 text-[13px] font-semibold text-[#064834] transition hover:bg-white sm:h-[46px] sm:w-auto"
                >
                  Explore Areas of Expertise
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#064834]/88 px-3.5 py-2 text-[12px] font-medium text-white shadow-sm sm:px-4 sm:text-[13px]">
                  <span className="relative flex h-[9px] w-[9px]">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-[9px] w-[9px] rounded-full bg-red-500" />
                  </span>
                  {liveCount}+ live appointments today
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
      </main>

      <ConsultationPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </>
  );
}
