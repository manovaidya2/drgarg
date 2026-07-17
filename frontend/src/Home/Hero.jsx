




// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   Brain,
//   CalendarCheck,
//   HeartPulse,
//   ShieldCheck,
//   Sparkles,
//   Users,
// } from "lucide-react";
// import heroBanner from "../images/2.jpg.jpeg";
// import ConsultationPopup from "../components/ConsultationPopup";

// const supportAreas = [
//   { label: "Holistic Approach", icon: Brain },
//   { label: "Science Based", icon: Sparkles },
//   { label: "Personalized Guidance", icon: Users },
//   { label: "Long-Term Support", icon: ShieldCheck },
// ];

// const authorityPoints = [
//   { title: "Ayurvedacharya", text: "", icon: Brain },
//   {
//     title: "Child Development &",
//     text: "Mental Wellness Specialist",
//     icon: Users,
//   },
//   { title: "7+ Years of", text: "Clinical Experience", icon: CalendarCheck },
//   { title: "Trusted by Families", text: "Across India", icon: ShieldCheck },
// ];

// export default function Hero() {
//   const [openPopup, setOpenPopup] = useState(false);
//   const [liveCount, setLiveCount] = useState(234);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setLiveCount((prev) => {
//         const increase = Math.floor(Math.random() * 3);
//         const decreaseChance = Math.random();
//         if (decreaseChance < 0.18 && prev > 230) return prev - 1;
//         return prev + increase;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <link rel="preload" as="image" href={heroBanner} fetchPriority="high" />

//       <main className="relative overflow-hidden ">
//         <section className="relative mx-auto min-h-[690px] w-full px-4 py-5 sm:min-h-[720px] sm:px-6 sm:py-8 lg:min-h-[560px] lg:px-[42px] lg:py-10">
//           <div className="absolute inset-0">
//             <img
//               src={heroBanner}
//               alt="Dr. Ankush Garg professional medical banner"
//               className="h-full w-full object-cover object-[63%_center] sm:object-[68%_center] lg:object-center"
//               loading="eager"
//               fetchPriority="high"
//               decoding="async"
//             />
//             <div className="absolute inset-0  " />
//           </div>

//           <div className="relative z-10 grid min-h-[650px] grid-cols-1 items-start gap-6 sm:min-h-[680px] sm:gap-8 lg:min-h-[500px] lg:block">
//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               className="mx-auto max-w-[670px] pt-4 text-center lg:mx-0 lg:pt-0 lg:text-left"
//             >
//               <h1 className="text-[34px] font-bold leading-[1.02] text-[#064834] min-[390px]:text-[37px] sm:text-[49px] md:text-[57px] lg:text-[59px] xl:text-[41px]">
//                 <span className="block text-[#161126]">A New Way to</span>
//                 Understand Autism,
//                 <br />
//                 ADHD & Mental Health
//               </h1>

//               <p className="mx-auto mt-4 max-w-[560px] text-[14.5px] font-medium leading-[1.6] text-[#4e4658] sm:text-[17px] lg:mx-0 xl:text-[16px]">
//                 Dr. Ankush Garg, one of India’s leading Ayurvedic Neurologists
//                 and developer of the Neuro-Ayurveda System, helps children,
//                 teenagers, adults, and seniors heal complex brain, behaviour,
//                 and mental health conditions through an integrated
//                 Brain-Gut-Behaviour approach.
//               </p>

//               <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:grid-cols-4 lg:max-w-[560px]">
//                 {supportAreas.map(({ label, icon: Icon }) => (
//                   <div
//                     key={label}
//                     className="flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-white/82 px-2.5 text-[11.5px] font-semibold leading-tight text-[#4c4160] shadow-sm ring-1 ring-[#d4e4dc]/70 sm:h-[40px] sm:rounded-none sm:bg-transparent sm:px-2 sm:text-[12px] sm:shadow-none sm:ring-0 sm:justify-start lg:border-r lg:border-[#d4e4dc] lg:last:border-r-0 xl:text-[13px]"
//                   >
//                     <Icon size={18} className="shrink-0 text-[#064834]" />
//                     <span>{label}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
//                 <button
//                   onClick={() => setOpenPopup(true)}
//                   className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#064834] px-7 text-[13px] font-semibold text-white shadow-[0_16px_36px_rgba(6,72,52,0.25)] transition hover:bg-[#053b2b] sm:h-[46px] sm:w-auto"
//                 >
//                   Book Assessment
//                   <CalendarCheck size={16} />
//                 </button>

//                 <Link
//                   to="/neuro-ayurveda-system"
//                   className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[6px] border border-[#7aa08f] bg-white/86 px-7 text-[13px] font-semibold text-[#064834] transition hover:bg-white sm:h-[46px] sm:w-auto"
//                 >
//                   Explore Areas of Expertise
//                   <ArrowRight size={16} />
//                 </Link>
//               </div>

//               <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
//                 <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#064834]/88 px-3.5 py-2 text-[12px] font-medium text-white shadow-sm sm:px-4 sm:text-[13px]">
//                   <span className="relative flex h-[9px] w-[9px]">
//                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
//                     <span className="relative inline-flex h-[9px] w-[9px] rounded-full bg-red-500" />
//                   </span>
//                   {liveCount}+ live appointments today
//                 </div>

//                 <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/92 px-3.5 py-2 text-[12px] font-semibold text-[#33283f] shadow-sm ring-1 ring-[#d7e6df] sm:px-4 sm:text-[13px]">
//                   <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[13px] font-bold shadow-sm">
//                     <span className="text-[#4285f4]">G</span>
//                   </span>
//                   <span>4.9 Google Reviews</span>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.aside
//               initial={{ opacity: 0, x: 22 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.75 }}
//               className="mx-auto mt-1 w-full max-w-[250px] rounded-[14px] border border-white/70 bg-white/92 p-2.5 shadow-[0_22px_55px_rgba(6,72,52,0.16)] backdrop-blur-md sm:mt-auto sm:max-w-[220px] lg:absolute lg:right-[-18px] lg:top-1/2 lg:mt-0 lg:w-[220px] lg:max-w-none lg:-translate-y-[calc(50%+140px)] xl:right-[-10px] 2xl:right-0"
//             >
//               <h2 className="mb-2.5 text-[14px] font-bold text-[#33283f]">
//                 Meet Dr. Ankush Garg
//               </h2>
//               <div className="grid gap-1.5">
//                 {authorityPoints.map(({ title, text, icon: Icon }) => (
//                   <div
//                     key={`${title}-${text}`}
//                     className="grid grid-cols-[28px_1fr] items-center gap-2 border-b border-[#dce8e2] pb-2 last:border-b-0 last:pb-0"
//                   >
//                     <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[#e7f2ec] text-[#064834]">
//                       <Icon size={16} strokeWidth={2} />
//                     </div>
//                     <div>
//                       <p className="text-[11px] font-semibold leading-snug text-[#33283f]">
//                         {title}
//                       </p>
//                       <p className="text-[11px] font-medium leading-snug text-[#6a5c78]">
//                         {text}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.aside>
//           </div>
//         </section>
//       </main>

//       <ConsultationPopup
//         isOpen={openPopup}
//         onClose={() => setOpenPopup(false)}
//       />
//     </>
//   );
// }






import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import heroDoctor from "../images/sirimg.webp";
import ConsultationPopup from "../components/ConsultationPopup";

const liveAppointments = [
  { name: "Aarav Sharma", time: "10:15 AM", status: "Confirmed" },
  { name: "Priya Mehta", time: "10:30 AM", status: "Online" },
  { name: "Rohan Gupta", time: "10:45 AM", status: "In clinic" },
  { name: "Ananya Singh", time: "11:00 AM", status: "Confirmed" },
  { name: "Kavya Jain", time: "11:20 AM", status: "Online" },
  { name: "Neha Verma", time: "11:40 AM", status: "Confirmed" },
  { name: "Aditya Rao", time: "12:05 PM", status: "In clinic" },
  { name: "Meera Kapoor", time: "12:30 PM", status: "Online" },
];

export default function Hero() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <link rel="preload" as="image" href={heroDoctor} fetchPriority="high" />
      <style>
        {`
          @keyframes liveAppointmentScroll {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(0, -50%, 0); }
          }
          .live-appointment-scroll {
            animation: liveAppointmentScroll 18s linear infinite;
            backface-visibility: hidden;
            will-change: transform;
          }
          .live-appointment-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <main className="relative overflow-hidden border-t border-[#eee8dc] bg-[#fbfaf6]">
        <section className="relative mx-auto grid min-h-[640px] w-full max-w-[1320px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:py-16 xl:px-16">
          <div className="relative z-10 max-w-[680px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#cdd9d0] bg-white/80 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#063f2c] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e2ad38]" />
              Trusted by parents & patients across India
            </div>

            <h1
              className="max-w-[690px] text-[42px] font-normal leading-[1.08] text-[#043c28] sm:text-[58px] lg:text-[62px] xl:text-[56px] 2xl:text-[62px]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              A New Way to
              <br />
              Understand{" "}
              <span className="text-[#dfad3d]">Autism,</span>
              <br />
              <span className="text-[#dfad3d]">ADHD</span> & Mental Health
            </h1>

            <p className="mt-8 max-w-[650px] text-[18px] font-normal leading-[1.65] text-[#2d3f48] sm:text-[20px] lg:text-[21px]">
              Dr. Ankush Garg, No.1 Ayurvedic Neurologist and developer of the
              Neuro-Ayurveda System, helps children, teenagers, adults, and
              seniors heal complex brain, behaviour, and mental health
              conditions through an integrated Brain-Gut-Behaviour approach.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setOpenPopup(true)}
                className="inline-flex h-[50px] items-center justify-center gap-3 rounded-full bg-[#003f29] px-7 text-[14px] font-bold text-white shadow-[0_14px_30px_rgba(0,63,41,0.18)] transition hover:bg-[#00331f]"
              >
                Book Consultation
                <ArrowRight size={17} strokeWidth={2.4} />
              </button>

              <Link
                to="/neuro-ayurveda-system"
                className="inline-flex h-[50px] items-center justify-center rounded-full border border-[#b9c9bf] bg-white/70 px-8 text-[14px] font-semibold text-[#003f29] transition hover:border-[#003f29] hover:bg-white"
              >
                Explore Neuro-Ayurveda System
              </Link>
            </div>

            <div className="mt-10 border-t border-[#e5e0d6] pt-7 text-[14px] leading-relaxed text-[#12362b] sm:text-[15px]">
              <p className="font-medium">Dr. Ankush Garg</p>
              <p>
                BAMS, MPH, PhD (Gut-Brain Axis Research) - Ayurvedacharya -
                Founder, Manovaidya
              </p>
            </div>

          </div>

          <div className="relative z-10 mx-auto mt-4 w-full max-w-[520px] lg:-top-14 lg:mt-0 lg:max-w-[560px] xl:-top-16">
            <div className="absolute inset-x-8 bottom-28 h-24 rounded-full bg-[#edf5ef] opacity-45" />

            <div className="relative ml-auto overflow-hidden rounded-[28px] rounded-bl-[6px] border border-[#eadfc9] bg-[#efe5d4] shadow-[0_22px_52px_rgba(10,64,42,0.13)]">
              <img
                src={heroDoctor}
                alt="Dr. Ankush Garg in consultation room"
                className="h-[420px] w-full object-cover object-center sm:h-[458px] lg:h-[458px]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="relative -mt-16 ml-0 max-w-[220px] rounded-[14px] border border-[#eee4d2] bg-white px-4 py-4 shadow-[0_16px_36px_rgba(20,50,38,0.14)] sm:ml-[-24px] sm:max-w-[240px]">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#dfad3d]"
                  strokeWidth={2}
                />
                <div>
                  <p
                    className="text-[13px] font-medium text-[#053b2a]"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    Root-Cause First
                  </p>
                  <p className="mt-2 text-[12px] leading-snug text-[#24443a]">
                    Brain - Gut - Nervous System - Behaviour
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1.25fr_0.75fr]">
              <div className="overflow-hidden rounded-[16px] border border-[#e8decf] bg-white/90 p-3 shadow-[0_12px_28px_rgba(11,58,40,0.08)]">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e64a35] opacity-70" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#e64a35]" />
                    </span>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#063f2c]">
                      Live Appointments
                    </p>
                  </div>
                  <span className="rounded-full bg-[#f8efe0] px-2 py-1 text-[10px] font-bold text-[#9a6812]">
                    234+ today
                  </span>
                </div>

                <div className="relative h-[58px] overflow-hidden">
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-3 bg-gradient-to-b from-white to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3 bg-gradient-to-t from-white to-transparent" />
                  <div className="live-appointment-scroll">
                    {[...liveAppointments, ...liveAppointments].map(
                      (appointment, index) => (
                        <div
                          key={`${appointment.name}-${index}`}
                          className="grid h-[29px] grid-cols-[54px_1fr_auto] items-center gap-2 border-b border-[#f0e7d9] px-1 text-[12px] text-[#24443a]"
                        >
                          <span className="rounded-full bg-[#f7efe2] px-1.5 py-0.5 text-center text-[10px] font-bold text-[#8a641d]">
                            {appointment.time}
                          </span>
                          <span className="truncate font-semibold">
                            {appointment.name}
                          </span>
                          <span className="rounded-full bg-[#eaf5ef] px-2 py-0.5 text-[10px] font-bold text-[#07543a]">
                            {appointment.status}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex min-h-[92px] items-center gap-3 rounded-[16px] border border-[#e8decf] bg-white/90 p-3 ">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[24px] shadow-sm ring-1 ring-[#e5ded2]">
                  <FcGoogle />
                </div>
                <div>
                  <p className="text-[24px] font-bold leading-none text-[#063f2c]">
                    4.9+
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-[#24443a]">
                    Google Reviews
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#6c7a72]">
                    Trusted patient feedback
                  </p>
                </div>
              </div>
            </div>
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
