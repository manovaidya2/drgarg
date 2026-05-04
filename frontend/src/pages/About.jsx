// import React from "react";
// import { FaCheck, FaChartLine, FaHandsHelping } from "react-icons/fa";
// import img from "../images/banner-aayurveda.jpg";
// import img2 from "../images/sirimg.webp";
// import DrGargExpertiseSection from "./DrGargExpertiseSection";

// export default function About() {
//   return (
//     <>
//       {/* ===== BANNER ===== */}
//       <section
//         className="relative h-48 sm:h-56 md:h-60 w-full bg-cover bg-center flex items-center justify-center"
//         style={{ backgroundImage: `url(${img})` }}
//       >
//         <div className="absolute inset-0 bg-[#1d5a57]/80"></div>

//         <div className="relative text-center text-white px-4">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
//             Dr. Ankush Garg
//           </h1>
//           <p className="uppercase tracking-widest text-xs sm:text-sm md:text-base">
//             Ayurvedic Neurologist | Founder – Neuro-Ayurveda System
//           </p>
//         </div>
//       </section>

//       {/* ===== ABOUT SECTION ===== */}
//       <section className="bg-white py-8 sm:py-10 px-4 sm:px-6 lg:px-12">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

//           {/* LEFT CONTENT */}
//           <div className="lg:col-span-2">
//             <ul className="space-y-6 sm:space-y-7">
//               {[
//                 {
//                   title: "Experience & Expertise:",
//                   desc: "7+ years of experience in Teen Mental Wellness, Autism, ADHD, Anxiety, Depression, OCD, and Neurodevelopmental conditions.",
//                 },
//                 {
//                   title: "Neuro-Ayurveda Approach:",
//                   desc: "Founder of the Neuro-Ayurveda System focusing on Brain–Gut–Behaviour integration for long-term improvement.",
//                 },
//                 {
//                   title: "PhD Research (Gut–Brain Axis):",
//                   desc: "Extensive research on how gut health directly impacts brain development, emotional regulation, and behaviour patterns.",
//                 },
//                 {
//                   title: "Clinical Experience:",
//                   desc: "Worked with Thousands of children and adults dealing with focus issues, anxiety, behavioural challenges, and mental health conditions.",
//                 },
//                 {
//                   title: "Root Cause Treatment:",
//                   desc: "Focus on treating internal biology (brain, gut, hormones) along with behaviour — not just symptom management.",
//                 },
//               ].map((item, index) => (
//                 <li key={index} className="flex gap-4 items-start">
//                   <span
//                     className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full text-white flex items-center justify-center"
//                     style={{ backgroundColor: "#8b43ba" }}
//                   >
//                     <FaCheck size={14} />
//                   </span>
//                   <div>
//                     <h4 className="font-semibold text-base sm:text-lg text-gray-900">
//                       {item.title}
//                     </h4>
//                     <p className="text-sm sm:text-base text-gray-600">
//                       {item.desc}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* RIGHT STACKED CARDS */}
//           <div className="space-y-6">
//             <div
//               className="text-white rounded-xl p-5 sm:p-6 flex gap-4 items-center"
//               style={{ backgroundColor: "#8b43ba" }}
//             >
//               <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-lg">
//                 <FaChartLine />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-base sm:text-lg">
//                   Book Consultation
//                 </h4>
//                 <p className="text-xs sm:text-sm text-white/90">
//                   Get expert guidance for your teen’s mental wellness
//                 </p>
//               </div>
//             </div>

//             <img
//               src={img2}
//               alt="Dr Ankush Garg - Teen Mental Health Expert"
//               className="rounded-xl w-full h-auto max-h-[350px] object-cover"
//             />

//             <div className="bg-emerald-700 text-white rounded-xl p-5 sm:p-6 flex gap-4 items-center">
//               <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-lg">
//                 <FaHandsHelping />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-base sm:text-lg">
//                   Safe & Scientific Approach
//                 </h4>
//                 <p className="text-xs sm:text-sm text-white/90">
//                   Structured system based on brain, gut & behaviour science
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>

//       <DrGargExpertiseSection />
//     </>
//   );
// }





import React from "react";
import { Helmet } from "react-helmet-async";
import AboutDoctorIntro from "../about/AboutDoctorIntro";
import DoctorAuthoritySection from "../about/DoctorAuthoritySection";
import DifferentStandardCare from "../about/DifferentStandardCare";
import CredentialsAuthority from "../about/CredentialsAuthority";
import GutBrainAxisSection from "../about/GutBrainAxisSection";
import ResearchAndMethod from "../about/ResearchAndMethod";
import PhilosophyCTA from "../about/PhilosophyCTA";


function About() {
  return (
    <>
      <Helmet>
        <title>
          Dr. Ankush Garg | India’s No.1 Autism Doctor & Neuro-Ayurveda Specialist
        </title>

        <meta
          name="description"
          content="Dr. Ankush Garg is India’s leading Autism Doctor and Ayurvedic Neurologist. Founder of Manovaidya and developer of the Neuro-Ayurveda System, specializing in autism, ADHD, anxiety, OCD, and holistic brain health."
        />

        <meta
          name="keywords"
          content="Dr Ankush Garg, Autism Doctor India, ADHD treatment, Ayurvedic Neurologist, Neuro Ayurveda, Manovaidya, gut brain axis doctor, anxiety depression OCD treatment, autism specialist India"
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Ankush Garg" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />

        <link rel="canonical" href="https://drankushgarg.com/" />

        <meta
          property="og:title"
          content="Dr. Ankush Garg | India’s No.1 Autism Doctor"
        />
        <meta
          property="og:description"
          content="Specialized Neuro-Ayurveda treatment for Autism, ADHD, Anxiety & Brain Health. Developed by Dr. Ankush Garg."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drankushgarg.com/" />
        <meta
          property="og:image"
          content="https://drankushgarg.com/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Dr. Ankush Garg | Autism & Brain Health Specialist"
        />
        <meta
          name="twitter:description"
          content="India’s leading Autism Doctor using Neuro-Ayurveda system for brain, behaviour & gut health."
        />
        <meta
          name="twitter:image"
          content="https://drankushgarg.com/og-image.jpg"
        />
      </Helmet>

      <div>
       <AboutDoctorIntro />
       <DoctorAuthoritySection />
       <DifferentStandardCare />
       <CredentialsAuthority />
       <GutBrainAxisSection   />
       <ResearchAndMethod />
       <PhilosophyCTA />
      </div>
    </>
  );
}

export default About;   