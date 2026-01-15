import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import awdimg from "../images/pic1.jpg";
import awdimg2 from "../images/pic2.jpg";

export default function DoctorTabs() {
  const [activeTab, setActiveTab] = useState("training");

  const tabs = [
    { id: "training", label: "Training and Mentorship" },
    { id: "awards", label: "Recognitions and Awards" },
    { id: "expertise", label: "Expertise in Mental Health" },
  ];

  const awardImages = [awdimg, awdimg2, "/images/award3.png"];

  const content = {
    training: (
      <div className="text-gray-700 space-y-3 text-sm sm:text-base">
        <p>Trained under and worked with many respected gurus of classical Ayurveda.</p>
        <p>Assisted doctors at Shri Vishwamrut Chikitsalaya, Pune.</p>
        <p>Possesses records of successfully treating critical diseases.</p>
      </div>
    ),
    awards: (
      <div className="text-gray-700 space-y-3 text-sm sm:text-base">
        <p>Recipient of multiple Ayurveda excellence awards.</p>
        <p>Recognized for contributions to mental health and neuro-Ayurveda.</p>
        <p>Featured in various conferences and publications.</p>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {awardImages.map((img, index) => (
            <div
              key={index}
              className="border rounded-lg p-2 flex items-center justify-center bg-white hover:scale-105 transition-transform"
            >
              <img
                src={img}
                alt={`Award ${index + 1}`}
                className="h-16 sm:h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    ),
    expertise: (
      <div className="text-gray-700 space-y-3 text-sm sm:text-base">
        <p>
          Successfully treated patients globally with Autism, ADHD, OCD, Stress,
          Anxiety, Depression, Alzheimer's, and more.
        </p>
        <p>Conducts mind wellness programs and seminars.</p>
        <p>Helping students with competitive exams.</p>
      </div>
    ),
  };

  const specializations = [
    {
      title: "Autism & Speech Delay Care",
      description:
        "Improving communication, eye contact, and social development.",
    },
    {
      title: "Behavioural, ADHD & Mental Health Treatment",
      description:
        "Support for anxiety, stress, OCD, depression, and sleep issues.",
    },
    {
      title: "Neuro-Ayurveda Approach",
      description:
        "Personalised Ayurvedic protocols for brain–gut–nervous system healing.",
    },
  ];

  const reviews = [
    {
      name: "Sakshi Kashyap",
      text:
        "Manovaidya me 3–4 months me improvement dikhne lagi. Ab wo active aur confident hai.",
      rating: 5,
    },
    {
      name: "Prem Sharma",
      text:
        "Step-by-step roadmap aur Ayurvedic medicines ne kaafi help ki.",
      rating: 4,
    },
    {
      name: "Vikash Pandey",
      text:
        "Dr. Ankush Garg ji has very good knowledge. Full faith in treatment.",
      rating: 4,
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 max-w-6xl mx-auto mt-8 sm:mt-12">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

        {/* LEFT SECTION */}
        <div className="lg:w-2/3">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-300 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-shrink-0 py-2 px-3 sm:px-4 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-[#8b43ba] border-b-2 border-[#8b43ba]"
                    : "text-gray-500 hover:text-[#8b43ba]"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-4">{content[activeTab]}</div>

          {/* Specializations */}
          <div className="mt-6 sm:mt-8 bg-gray-50 p-4 sm:p-6 rounded-xl">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Specializations
            </h3>

            <div className="space-y-4">
              {specializations.map((spec, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-gray-800 mb-1 text-sm sm:text-base">
                    {spec.title}
                  </h4>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="lg:w-1/3 bg-gray-50 p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Google Reviews
          </h3>

          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-3">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 mr-1 ${
                        i < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-xs sm:text-sm mb-1">
                  "{review.text}"
                </p>
                <p className="text-gray-500 text-xs font-medium">
                  – {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
