import React from "react";
import { FaBrain, FaHeartbeat, FaUserGraduate } from "react-icons/fa";

export default function DrGargExpertiseSection() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: "#8b43ba" }}>
            Expertise in Teen Mental Wellness & Neurodevelopment
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            A science-based approach focused on Brain–Gut–Behaviour connection to improve focus, emotional balance, and long-term mental development in teens.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Teen Focus & Performance */}
          <div
            className="border-l-8 rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{ backgroundColor: "#f3e8ff", borderColor: "#8b43ba" }}
          >
            <FaUserGraduate className="text-5xl mb-4" style={{ color: "#8b43ba" }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: "#8b43ba" }}>
              Focus & Academic Performance
            </h3>
            <p className="text-gray-700">
              Helps teens improve concentration, memory, attention span, and reduce exam stress through brain-based development methods.
            </p>
          </div>

          {/* Mental Health */}
          <div
            className="border-l-8 rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{ backgroundColor: "#f3e8ff", borderColor: "#8b43ba" }}
          >
            <FaBrain className="text-5xl mb-4" style={{ color: "#8b43ba" }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: "#8b43ba" }}>
              Anxiety, ADHD & Behaviour
            </h3>
            <p className="text-gray-700">
              Specialized in managing anxiety, ADHD, mood swings, anger, and emotional imbalance by addressing root causes.
            </p>
          </div>

          {/* Brain-Gut Approach */}
          <div
            className="border-l-8 rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{ backgroundColor: "#f3e8ff", borderColor: "#8b43ba" }}
          >
            <FaHeartbeat className="text-5xl mb-4" style={{ color: "#8b43ba" }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: "#8b43ba" }}>
              Brain–Gut Healing System
            </h3>
            <p className="text-gray-700">
              A structured Neuro-Ayurveda approach focused on improving brain function, gut health, and behaviour for long-term results.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}