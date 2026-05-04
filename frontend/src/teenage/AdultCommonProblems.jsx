// import React from "react";
// import {
//   Brain,
//   CloudFog,
//   Moon,
//   BatteryLow,
//   HeartPulse,
//   Wind,
//   Zap,
//   CircleDot,
//   CheckCircle2,
// } from "lucide-react";

// const problems = [
//   "Anxiety",
//   "Depression",
//   "OCD",
//   "Panic attacks",
//   "Overthinking",
//   "Brain fog",
//   "Sleep problems",
//   "Stress-related acidity",
//   "Fatigue",
//   "Low motivation",
//   "Emotional numbness",
//   "Palpitations",
//   "Restlessness",
// ];

// const featureCards = [
//   { title: "Mind", text: "Thoughts, mood & emotional patterns", icon: Brain },
//   { title: "Body", text: "Gut, acidity, fatigue & hormones", icon: HeartPulse },
//   { title: "Sleep", text: "Rest, recovery & nervous system reset", icon: Moon },
//   { title: "Stress", text: "Anxiety, panic & restlessness", icon: Wind },
// ];

// export default function AdultCommonProblems() {
//   return (
//     <section className="relative w-full overflow-hidden bg-[#fbfaf7] px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20">
//       {/* Background Glow */}
//       <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#e0aa3e]/20 blur-[80px]" />
//       <div className="absolute right-[-120px] bottom-[-120px] h-[300px] w-[300px] rounded-full bg-[#00402a]/10 blur-[90px]" />

//       <div className="relative max-w-[1280px] mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
//           {/* LEFT CONTENT */}
//           <div className="rounded-[28px] bg-[#0b3322] px-6 sm:px-8 lg:px-10 py-9 sm:py-11 text-white shadow-[0_28px_70px_rgba(0,0,0,0.18)]">
//             <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e0aa3e]">
//               Common Problems
//             </p>

//             <h2 className="mt-6 font-serif text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.08] tracking-[-0.03em]">
//               What Many Adults
//               <br />
//               <span className="text-[#e0aa3e]">Quietly Struggle With</span>
//             </h2>

//             <p className="mt-5 text-[15px] sm:text-[17px] leading-[1.75] text-white/75">
//               These symptoms often feel separate, but they may be connected
//               through stress, sleep, gut health, hormones, and nervous system
//               imbalance.
//             </p>

//             <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {featureCards.map((item, index) => {
//                 const Icon = item.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="rounded-[18px] border border-white/10 bg-white/[0.06] p-4"
//                   >
//                     <Icon size={24} className="text-[#e0aa3e] mb-3" />
//                     <h3 className="text-[16px] font-semibold">{item.title}</h3>
//                     <p className="mt-1 text-[13px] leading-5 text-white/60">
//                       {item.text}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* RIGHT PROBLEMS LIST */}
//           <div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {problems.map((item, index) => (
//                 <div
//                   key={index}
//                   className="group flex items-center gap-3 rounded-[18px] border border-[#eadfca] bg-white px-4 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e0aa3e] hover:shadow-[0_18px_45px_rgba(2,60,40,0.10)]"
//                 >
//                   <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#f4efe3] text-[#00402a] group-hover:bg-[#00402a] group-hover:text-white transition">
//                     <CheckCircle2 size={20} strokeWidth={1.8} />
//                   </div>

//                   <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#0b3322] leading-tight">
//                     {item}
//                   </h3>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-5 rounded-[22px] border border-[#eadfca] bg-white px-5 sm:px-7 py-5 shadow-sm">
//               <div className="flex items-start gap-3">
//                 <span className="mt-1 flex h-[10px] w-[10px] shrink-0 rounded-full bg-[#e0aa3e]" />
//                 <p className="text-[15px] sm:text-[17px] leading-[1.65] text-[#2f3f4a]">
//                   You are not broken. Your system may simply need the right
//                   support, structure, and root-cause care.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import React from "react";

const problems = [
  "Study pressure",
  "Marks stress",
  "Future anxiety",
  "Overthinking",
  "Screen addiction",
  "Late-night phone use",
  "Sleep loss",
  "Low confidence",
  "Mood swings",
  "Sudden anger",
  "Emotional overload",
  "Social media comparison",
  "Loneliness",
  "Communication block",
  "Parent-child disconnect",
];

export default function TeenageCommonProblems() {
  return (
    <section className="w-full bg-[#fbfaf7] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mx-auto ">
        
        {/* Label */}
        <p className="text-[#d99b2f] uppercase tracking-[0.35em] text-[11px] sm:text-[12px] font-medium mb-4">
          What We See
        </p>

        {/* Heading */}
        <h2 className="font-serif text-[#073821] text-[26px] sm:text-[34px] md:text-[40px] lg:text-[42px] leading-[1.15] tracking-[-0.03em] max-w-[900px]">
          Common Teenage Issues
        </h2>

        {/* Pills */}
        <div className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
          {problems.map((item, index) => (
            <span
              key={index}
              className="inline-flex h-[38px] items-center justify-center rounded-full border border-[#dedbd4] bg-white px-4 text-[14px] text-[#102b2d]"
            >
              {item}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}