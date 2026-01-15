import React from "react";
import doctorImg from "../images/doctor 2.webp";

export default function AboutSection() {
  return (
    <section className="py-10 sm:py-14 md:py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center gap-10 md:gap-14">

        {/* IMAGE SIDE */}
        <div className="relative w-full md:w-1/2 flex justify-center">

          {/* Purple background shape */}
          <div className="
            absolute 
            w-72 h-40
            sm:w-80 sm:h-44
            md:w-[400px] md:h-52
            bg-purple-600 
            rounded-t-full 
            left-1/2 -translate-x-1/2 
            bottom-0 
            z-10
          "></div>

          {/* Yellow dots */}
          <div className="
            absolute 
            left-2 sm:-left-6 md:-left-16 
            top-4 sm:-top-4 md:-top-6 
            grid grid-cols-3 grid-rows-5 gap-2 
            z-20
          ">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-400 rounded-full"
              ></div>
            ))}
          </div>

          {/* Doctor image */}
          <img
            src={doctorImg}
            alt="Doctor"
            className="
              relative z-30 
              w-56 sm:w-64 md:w-80 lg:w-96 
              object-contain
            "
          />
        </div>

        {/* TEXT SIDE */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Dr. Ankush Garg is an Ayurvedic Neurologist and founder of Manovaidya,
            a Neuro-Ayurveda clinic specializing in Autism and Mental Health.
            He combines traditional Ayurveda with modern insights to support
            long-term brain, gut, and nervous system wellness.
          </p>
        </div>

      </div>
    </section>
  );
}
