import React from "react";
import { FaCheck, FaChartLine, FaHandsHelping } from "react-icons/fa";
import img from "../images/banner-aayurveda.jpg";
import img2 from "../images/20260113_150634 (1).webp";
import DrGargExpertiseSection from "./DrGargExpertiseSection";

export default function About() {
  return (
    <>
      {/* ===== BANNER ===== */}
      <section
        className="relative h-48 sm:h-56 md:h-60 w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-[#1d5a57]/80"></div>

        <div className="relative text-center text-white px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Dr. Ankush Garg
          </h1>
          <p className="uppercase tracking-widest text-xs sm:text-sm md:text-base">
            Ayurvedacharya & Senior Ayurvedic Consultant at Manovaidya
          </p>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="bg-white py-8 sm:py-10 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">
            <ul className="space-y-6 sm:space-y-7">
              {[
                {
                  title: "Professional Experience:",
                  desc: "Founder & Chief Consultant at Shri Vrinda Ayurveda, LokAyur & Manovaidya Ayurvedic Clinics.",
                },
                {
                  title: "Specializations:",
                  desc: "Expertise in Nadi Parikshan, Agni Karma, Viddha Karma and Panchakarma.",
                },
                {
                  title: "Training and Mentorship:",
                  desc: "Trained under renowned Gurus of classical Ayurveda.",
                },
                {
                  title: "Recognitions and Awards:",
                  desc: "Received prestigious awards for contributions in Ayurveda.",
                },
                {
                  title: "Expertise in Mental Health:",
                  desc: "Successfully treated Autism, ADHD, OCD, Anxiety, Depression, Alzheimer’s and more.",
                },
              ].map((item, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <span
                    className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full text-white flex items-center justify-center"
                    style={{ backgroundColor: "#8b43ba" }}
                  >
                    <FaCheck size={14} />
                  </span>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT STACKED CARDS */}
          <div className="space-y-6">
            <div
              className="text-white rounded-xl p-5 sm:p-6 flex gap-4 items-center"
              style={{ backgroundColor: "#8b43ba" }}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-lg">
                <FaChartLine />
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg">
                  Consult doctor
                </h4>
                <p className="text-xs sm:text-sm text-white/90">
                  Mental health expert in Ayurveda
                </p>
              </div>
            </div>
<img
  src={img2}
  alt="Doctor"
  className="rounded-xl w-full h-auto max-h-[350px] object-cover"
/>


            <div className="bg-emerald-700 text-white rounded-xl p-5 sm:p-6 flex gap-4 items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-lg">
                <FaHandsHelping />
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg">
                  You are in safe hands
                </h4>
                <p className="text-xs sm:text-sm text-white/90">
                  Expert in Ayurvedic pharmacy & formulations
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <DrGargExpertiseSection />
    </>
  );
}
