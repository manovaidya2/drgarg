import React from "react";
import doctorImg from "../images/doctor 2.webp"; // Replace with your uploaded image

export default function AboutSection() {
  return (
    <section className="py-1 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Left Side: Doctor Image with background and dots */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          {/* Purple background semi-pill */}
          <div className="absolute w-96 h-48 md:w-[400px] md:h-78 bg-purple-600 rounded-t-full left-1/2 transform -translate-x-1/2 -bottom-0 z-10"></div>

          {/* Yellow dot grid at top-left of purple shape */}
          <div className="absolute -left-12 md:-left-16 -top-4 md:-top-6 grid grid-cols-3 grid-rows-5 gap-2 z-20">
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            ))}
          </div>

          {/* Doctor Image */}
          <img
            src={doctorImg}
            alt="Doctor"
            className="relative z-30 w-64 md:w-80 lg:w-96 object-contain"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
           Dr. Ankush Garg is an Ayurvedic Neurologist and founder of Manovaidya, a Neuro‑Ayurveda clinic specializing in Autism and Mental Health. He combines traditional Ayurveda with modern insights to support long-term brain, gut, and nervous system wellness.
          </p>
        </div>
      </div>
    </section>
  );
}
