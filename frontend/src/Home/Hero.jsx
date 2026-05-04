// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FaStar, FaShareAlt } from "react-icons/fa";
// import doctorImage from "../images/sirimg.webp";

// export default function Hero() {
//   return (
//     <section className="relative bg-gradient-to-r from-purple-50 to-purple-100 overflow-hidden py-16 md:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center md:items-start gap-10 md:gap-12">

//         {/* TEXT SECTION */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative flex-1 bg-white/80 backdrop-blur-md border border-purple-300 rounded-3xl shadow-lg p-6 sm:p-8 md:p-12 flex flex-col gap-4 text-center md:text-left"
//         >
//           {/* Name */}
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-900">
//             Dr. Ankush Garg
//           </h1>

//           <p className="text-purple-700 font-semibold text-base sm:text-lg">
//             Ayurvedic Neurologist | Founder – Neuro-Ayurveda System
//           </p>

//           {/* STATS */}
//           <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
//             <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm">
//               <FaStar /> 4.9 (10,000+ Families)
//             </div>

//             <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm">
//               7+ Years Experience
//             </div>

//             <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm">
//               Teen Mental Health Expert
//             </div>
//           </div>

//           {/* BIO */}
//           <p className="text-gray-700 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
//             Dr. Ankush Garg is an Ayurvedic Neurologist specializing in Teen Mental Wellness,
//             Autism, ADHD, Anxiety, and Neurodevelopmental conditions. His approach focuses on
//             the <strong>Brain–Gut–Behaviour connection</strong> to create real and long-term improvement.
//           </p>

//           <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
//             He has completed advanced PhD research on the <strong>Gut–Brain Axis</strong>,
//             exploring how gut health directly impacts brain development, emotional stability,
//             and behaviour patterns in teens.
//           </p>

//           <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
//             His system is designed to treat the <strong>root cause</strong> — not just symptoms —
//             by working on brain function, gut health, hormones, and behaviour together.
//           </p>

//           {/* BUTTONS */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-5 justify-center md:justify-start">
//             <button className="flex items-center justify-center gap-2 bg-purple-100 text-purple-800 px-5 py-3 rounded-xl shadow hover:scale-105 transition-transform">
//               <FaShareAlt /> Share
//             </button>

//             <Link
//               to="/contact"
//               className="bg-purple-700 text-white px-6 py-3 rounded-xl shadow text-center hover:scale-105 transition-transform"
//             >
//               Book Consultation
//             </Link>
//           </div>
//         </motion.div>

//         {/* IMAGE */}
//         <motion.div
//           initial={{ opacity: 0, y: 40, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           className="flex-shrink-0 relative z-20 w-64 sm:w-72 md:w-96 h-72 sm:h-80 md:h-[28rem] rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-300 mt-0 md:-mt-16"
//         >
//           <img
//             src={doctorImage}
//             alt="Dr Ankush Garg"
//             className="w-full h-full object-cover"
//           />
//         </motion.div>
//       </div>

//       {/* DECORATION */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
//     </section>
//   );
// }



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Star, Users } from "lucide-react";
import doctorImage from "../images/sirimg.webp";
import ConsultationPopup from "../components/ConsultationPopup";


export default function Hero() {
  const [liveCount, setLiveCount] = useState(28);
  const [patientIndex, setPatientIndex] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);

const patientNames = [
  // Delhi NCR
  "Rahul Sharma from Gurgaon",
  "Ankit Verma from Noida",
  "Pooja Khanna from Delhi",
  "Neha Gupta from Ghaziabad",
  "Amit Jain from Faridabad",
  "Sakshi Tiwari from Rohini",
  "Deepak Malhotra from Dwarka",
  "Rohit Arora from Lajpat Nagar",
  "Nitin Kapoor from Karol Bagh",

  // Mumbai & Maharashtra
  "Priya Deshmukh from Mumbai",
  "Sneha Patil from Pune",
  "Tejas Kulkarni from Nagpur",
  "Harsh Vora from Thane",
  "Kunal Mehta from Navi Mumbai",
  "Vaibhav Joshi from Nashik",

  // Bangalore / South
  "Rajesh Reddy from Bengaluru",
  "Arjun Iyer from Chennai",
  "Varun Nair from Kochi",
  "Akash Gowda from Coimbatore",
  "Suresh Shetty from Mysore",
  "Naveen Kumar from Hyderabad",
  "Divya Menon from Vizag",

  // North India
  "Manish Singh from Chandigarh",
  "Ritika Rawat from Dehradun",
  "Anjali Mishra from Lucknow",
  "Saurabh Srivastava from Kanpur",
  "Vikas Rathore from Jaipur",
  "Pankaj Gehlot from Udaipur",
  "Ravi Chawla from Amritsar",

  // Central India
  "Deepak Soni from Indore",
  "Nikita Sharma from Bhopal",
  "Ankur Tiwari from Gwalior",
  "Mohit Kushwaha from Jabalpur",

  // East India
  "Karan Banerjee from Kolkata",
  "Sourav Das from Howrah",
  "Amit Pradhan from Ranchi",
  "Rahul Nayak from Bhubaneswar",

  // West India
  "Megha Shah from Ahmedabad",
  "Harsh Patel from Vadodara",
  "Jay Trivedi from Rajkot",
  "Rakesh Chauhan from Surat",

  // Tier 2 / 3 (real feel 🔥)
  "Pooja Rana from Meerut",
  "Anil Saxena from Aligarh",
  "Sunita Kadian from Hisar",
  "Ravi Panwar from Panipat",
  "Neeraj Tanwar from Karnal",
  "Komal Thakur from Shimla",
  "Vivek Mishra from Bilaspur",
  "Rahul Yadav from Gorakhpur",
  "Aarti Dubey from Bareilly",

  // Extra realism
  "Abhishek Pandey from Varanasi",
  "Shivam Gupta from Prayagraj",
  "Rohini Kulkarni from Aurangabad",
  "Aditya Agarwal from Jaipur",
  "Kriti Bansal from Delhi",
  "Tarun Chhabra from Ludhiana",
  "Ramesh Pillai from Kochi",
  "Sanjay Naidu from Hyderabad",
  "Gaurav Bhatia from Noida",
  "Manoj Yadav from Patna"
];
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => {
        const increase = Math.floor(Math.random() * 3);
        const decreaseChance = Math.random();

        if (decreaseChance < 0.18 && prev > 24) return prev - 1;
        return prev + increase;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nameInterval = setInterval(() => {
      setPatientIndex((prev) => (prev + 1) % patientNames.length);
}, 6000);

    return () => clearInterval(nameInterval);
  }, []);

  return (
    <>
    <section className="relative w-full overflow-hidden bg-[#fbfaf7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-[42px] py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] items-center gap-8 lg:gap-12">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#bdcfc3] bg-white/70 px-3 sm:px-4 py-[7px] text-[9px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.32em] uppercase text-[#003b27] mb-5 sm:mb-7">
              <span className="h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#e7ad39]" />
              <span className="truncate">
                Trusted by Parents & Patients Across India
              </span>
            </div>

            <h1 className="font-serif text-[#003b27] text-[38px] min-[390px]:text-[42px] sm:text-[54px] md:text-[58px] lg:text-[52px] xl:text-[60px] leading-[1.02] sm:leading-[0.96] tracking-[-0.03em]">
              A New Way to
              <br />
              Understand <span className="text-[#e0aa3e]">Autism,</span>
              <br />
              <span className="text-[#e0aa3e]">ADHD</span>{" "}
              <span className="text-[#003b27]">& Mental Health</span>
            </h1>

            <p className="mt-5 sm:mt-8 max-w-[650px] mx-auto lg:mx-0 text-[15px] sm:text-[17px] md:text-[20px] leading-[1.65] text-[#2f3f4a]">
              Dr. Ankush Garg, No.1 Ayurvedic Neurologist and developer of the
              Neuro-Ayurveda System, helps children, teenagers, adults, and
              seniors heal complex brain, behaviour, and mental health
              conditions through an integrated Brain–Gut–Behaviour approach.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center justify-center lg:justify-start gap-3">
             <button
  onClick={() => setOpenPopup(true)}
  className="inline-flex h-[48px] sm:h-[50px] items-center justify-center gap-2 rounded-full bg-[#00402a] px-6 sm:px-7 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#002f1f]"
>
  Book Consultation
  <ArrowRight size={17} />
</button>
              <Link
                to="/neuro-ayurveda-system"
                className="inline-flex h-[48px] sm:h-[50px] items-center justify-center rounded-full border border-[#b9cac1] bg-white/60 px-5 sm:px-7 text-[13px] sm:text-[14px] font-semibold text-[#00402a] transition hover:bg-white"
              >
                Explore Neuro-Ayurveda System
              </Link>
            </div>

            {/* GOOGLE REVIEW + LIVE APPOINTMENT */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[920px] mx-auto lg:mx-0">
              {/* Google Review Card */}
              <div className="flex items-center gap-4 rounded-[18px] border border-[#ded6c9] bg-white px-5 py-4 shadow-sm">
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#f3f1ea]">
                  <span className="text-[30px] font-bold text-[#4285F4]">
                    G
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-[30px] leading-none font-bold text-[#0b3322]">
                      4.9
                    </h3>

                    <div className="flex items-center gap-[1px] text-[#e4aa35]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          strokeWidth={1.8}
                          className="text-[#e4aa35]"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-1 text-[15px] font-semibold text-[#0b3322]">
                    10,000+ Google Reviews{" "}
                    <span className="font-normal text-[#5d625b]">· Live</span>
                  </p>
                </div>
              </div>

              {/* Live Appointment Card */}
              <div className="flex items-center gap-4 rounded-[18px] bg-[#0b3322] px-5 py-4 shadow-[0_14px_35px_rgba(0,0,0,0.16)]">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center">
                  <Users
                    size={28}
                    className="text-[#e4aa35]"
                    strokeWidth={1.8}
                  />
                </div>

     <div className="min-w-0 flex-1 text-left">
  <div className="flex items-center gap-2">
    <span className="relative flex h-[11px] w-[11px] shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
      <span className="relative inline-flex h-[11px] w-[11px] rounded-full bg-red-600" />
    </span>

    <h3 className="text-[18px] sm:text-[20px] font-bold text-white leading-tight">
      {liveCount}+ live appointments
    </h3>
  </div>

  <div className="mt-2 min-h-[38px] overflow-hidden">
    <motion.p
      key={patientIndex}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-[14px] sm:text-[15px] font-semibold text-white/65 leading-snug whitespace-normal break-words"
    >
      {patientNames[patientIndex]} just booked
    </motion.p>
  </div>
</div>
              </div>
            </div>

            <div className="mt-7 sm:mt-10 border-t border-[#e7e1d8] pt-5 sm:pt-6 max-w-[660px] mx-auto lg:mx-0">
              <p className="text-[12px] sm:text-[14px] leading-6 sm:leading-7 text-[#143528]">
                Dr. Ankush Garg
                <br />
                BAMS, MPH, PhD (Gut-Brain Axis Research) · Ayurvedacharya ·
                Founder, Manovaidya
              </p>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative mx-auto lg:mr-0 w-full max-w-[330px] sm:max-w-[420px] md:max-w-[458px] pt-0 lg:pt-2 order-1 lg:order-2"
          >
            <div className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(2,60,40,0.14)]">
              <img
                src={doctorImage}
                alt="Dr Ankush Garg"
                className="w-full h-[300px] min-[390px]:h-[340px] sm:h-[430px] md:h-[458px] object-cover object-center"
              />
            </div>

            <div className="absolute left-3 sm:left-[-28px] bottom-[-20px] sm:bottom-[-25px] w-[200px] sm:w-[220px] rounded-[14px] border border-[#eee4d3] bg-white px-4 py-3 sm:py-4 shadow-[0_18px_45px_rgba(0,0,0,0.12)] text-left">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <ShieldCheck size={16} className="text-[#e0aa3e]" />
                <p className="font-serif text-[13px] sm:text-[14px] text-[#143528]">
                  Root-Cause First
                </p>
              </div>

              <p className="text-[11px] sm:text-[12px] leading-[1.35] text-[#263b33]">
                Brain · Gut · Nervous System · Behaviour
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
    <ConsultationPopup
  isOpen={openPopup}
  onClose={() => setOpenPopup(false)}
/>
</>
  );
}