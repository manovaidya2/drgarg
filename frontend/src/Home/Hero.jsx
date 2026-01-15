import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStar, FaShareAlt } from "react-icons/fa";
import doctorImage from "../images/20260113_150634 (1).webp";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-purple-50 to-purple-100 overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center md:items-start gap-10 md:gap-12">

        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex-1 bg-white/80 backdrop-blur-md border border-purple-300 rounded-3xl shadow-lg p-6 sm:p-8 md:p-12 flex flex-col gap-4 text-center md:text-left"
        >
          {/* Name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-900">
            Dr. Ankush Garg
          </h1>

          <p className="text-purple-700 font-semibold text-base sm:text-lg">
            B.A.M.S , M.P.H , Ph.D.
          </p>

          {/* STATS */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
            <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm">
              <FaStar /> 4.9 (55 Reviews)
            </div>

            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm">
              8+ Years Experience
            </div>

            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm">
              Mental Health Expert
            </div>
          </div>

          {/* BIO */}
          <p className="text-gray-700 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
            Dr. Ankush Garg is an Ayurvedic Neurologist and founder of Manovaidya,
            a Neuro-Ayurveda clinic specializing in Autism and Mental Health.
            He combines traditional Ayurveda with modern insights to support
            long-term brain, gut, and nervous system wellness.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-5 justify-center md:justify-start">
            <button className="flex items-center justify-center gap-2 bg-purple-100 text-purple-800 px-5 py-3 rounded-xl shadow hover:scale-105 transition-transform">
              <FaShareAlt /> Share
            </button>

            <Link
              to="/contact"
              className="bg-purple-700 text-white px-6 py-3 rounded-xl shadow text-center hover:scale-105 transition-transform"
            >
              Contact
            </Link>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0 relative z-20 w-64 sm:w-72 md:w-96 h-72 sm:h-80 md:h-[28rem] rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-300 mt-0 md:-mt-16"
        >
          <img
            src={doctorImage}
            alt="Dr Ankush Garg"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* DECORATION */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
    </section>
  );
}
