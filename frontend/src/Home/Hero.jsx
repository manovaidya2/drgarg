import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaShareAlt } from "react-icons/fa";
import doctorImage from "../images/20260113_150634 (1).webp";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-purple-50 to-purple-100 overflow-hidden py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center md:items-start gap-12">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex-1 bg-white/80 backdrop-blur-md border border-purple-300 rounded-3xl shadow-lg p-8 md:p-12 flex flex-col gap-4"
        >
          {/* Name & Degrees */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900">
            Dr. Ankush Garg
          </h1>
          <p className="text-purple-700 font-semibold text-lg">
            B.A.M.S , M.P.H , Ph.D.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium shadow-sm">
              <FaStar /> 4.9 (55 Reviews)
            </div>
            <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium shadow-sm">
              8+ Years Experience
            </div>
            <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium shadow-sm">
              Mental Health Expert
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-700 mt-4 leading-relaxed">
            Dr. Ankush Garg is an Ayurvedic Neurologist and founder of Manovaidya, a Neuro‑Ayurveda clinic specializing in Autism and Mental Health. He combines traditional Ayurveda with modern insights to support long-term brain, gut, and nervous system wellness.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="flex items-center gap-2 bg-purple-100 text-purple-800 px-5 py-3 rounded-xl shadow hover:scale-105 transition-transform">
              <FaShareAlt /> Share
            </button>

            <Link
              to="/contact"
              className="bg-purple-700 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition-transform"
            >
              Contact
            </Link>
          </div>
        </motion.div>

        {/* Doctor Image */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0 relative z-20 w-80 md:w-96 h-96 md:h-[28rem] rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-300 -mt-16 md:mt-0"
        >
          <img
            src={doctorImage}
            alt="Dr Ankush Garg"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Decorative Blurred Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full translate-x-1/3 translate-y-1/3 filter blur-3xl"></div>
    </section>
  );
}
