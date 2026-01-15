import React from "react";
import { FaBrain, FaHeartbeat, FaUserGraduate } from "react-icons/fa";

export default function DrGargExpertiseSection() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: "#8b43ba" }}>
            Expertise in Holistic Wellness & Mental Health
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Healing minds, enhancing potential, and restoring balance with Ayurvedic wisdom and modern mental health expertise.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Memory & Exam Guidance */}
          <div
            className="border-l-8 rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{ backgroundColor: "#f3e8ff", borderColor: "#8b43ba" }}
          >
            <FaUserGraduate className="text-5xl mb-4" style={{ color: "#8b43ba" }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: "#8b43ba" }}>
              Student Success & Memory Enhancement
            </h3>
            <p className="text-gray-700">
              Assisting students in boosting memory, focus, retention, attention, and managing exam stress for competitive exams.
            </p>
          </div>

          {/* Mental Health Expertise */}
          <div
            className="border-l-8 rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{ backgroundColor: "#f3e8ff", borderColor: "#8b43ba" }}
          >
            <FaBrain className="text-5xl mb-4" style={{ color: "#8b43ba" }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: "#8b43ba" }}>
              Mental Health Disorders
            </h3>
            <p className="text-gray-700">
              Expert in treating stress, anxiety, depression, OCD, PTSD, and more. Focused on addressing root causes for lasting well-being.
            </p>
          </div>

          {/* Holistic Ayurveda */}
          <div
            className="border-l-8 rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{ backgroundColor: "#f3e8ff", borderColor: "#8b43ba" }}
          >
            <FaHeartbeat className="text-5xl mb-4" style={{ color: "#8b43ba" }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: "#8b43ba" }}>
              Ayurvedic Healing & Balance
            </h3>
            <p className="text-gray-700">
              Senior Ayurvedic consultant at Manovaidya, dedicated to holistic wellness with compassion, empathy, and Ayurvedic wisdom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
