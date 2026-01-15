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
      <div className="text-gray-700 space-y-3">
        <p>Trained under and worked with many respected gurus of classical Ayurveda.</p>
        <p>Assisted doctors at Shri Vishwamrut Chikitsalaya, Pune.</p>
        <p>Possesses records of successfully treating critical diseases.</p>
      </div>
    ),
    awards: (
      <div className="text-gray-700 space-y-3">
        <p>Recipient of multiple Ayurveda excellence awards.</p>
        <p>Recognized for contributions to mental health and neuro-Ayurveda.</p>
        <p>Featured in various conferences and publications.</p>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {awardImages.map((img, index) => (
            <div
              key={index}
              className="border rounded-lg p-2 flex items-center justify-center bg-white hover:scale-105 transition-transform"
            >
              <img src={img} alt={`Award ${index + 1}`} className="h-20 object-contain" />
            </div>
          ))}
        </div>
      </div>
    ),
    expertise: (
      <div className="text-gray-700 space-y-3">
        <p>
          Successfully treated many patients globally suffering from mental illnesses such as Autism, ADHD, OCD, Stress, Anxiety, Depression, Alzheimer's, and more.
        </p>
        <p>Conducts mind wellness programs and seminars to promote mental well-being.</p>
        <p>Helping students with their competitive exams.</p>
      </div>
    ),
  };

  const specializations = [
    {
      title: "Autism & Speech Delay Care",
      description: "Improving communication, eye contact, and social development in children and adults.",
    },
    {
      title: "Behavioural, ADHD & Mental Health Treatment",
      description: "Support for hyperactivity, anxiety, stress, OCD, depression, and sleep issues.",
    },
    {
      title: "Neuro-Ayurveda Approach",
      description: "Brain mapping, gut analysis, and personalised Ayurvedic protocols to heal the brain–gut–nervous system.",
    },
  ];

  const reviews = [
    {
      name: "Sakshi Kashyap",
      text: "Meri beti hamesha tired aur inactive rehti thi. Kafi Therapies try kiye par improvement bilkul nhi dikhi. Manovaidya me 3 se 4 months me hi improvement dikhne lagi. Ab wo active aur confident hai. Treatment ab 9 mahine se continue hai aur kaafi progress mili rhi hai.",
      rating: 5,
    },
    {
      name: "Prem Sharma",
      text: "Meri beti loud sounds aur bright lights se easily disturb ho jati thi aur social interaction me problem hoti thi. Humne Pehle kafi therapies try ki but usse se koi khaas result nahi mila. Fir Manovaidya me treatment shuru karne ke 3 se 4 months me hi improvement dikhne lagi. Ab uski social interaction better hai, aur step-by-step roadmap aur Ayurvedic Medicines ne kaafi help ki.",
      rating: 4,
    },
     {
      name: "Vikash Pandey",
      text: "I took an appointment for my child with Dr. Ankush Garg ji and met him. He showed us one direction. He has very good knowledge. I took my child for treatment from him. We have full faith that he will cure our child. Thank you Dr. Ankush Garg ji.🙏🙏",
      rating: 4,
    },
   
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 md:p-8 max-w-6xl mx-auto mt-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Tabs + Content */}
        <div className="lg:w-2/3">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-300 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-shrink-0 py-2 px-4 font-medium transition-colors whitespace-nowrap ${
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

          {/* Tab Content */}
          <div className="mt-4">{content[activeTab]}</div>

          {/* Specializations */}
          <div className="mt-8 bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Specializations</h3>
            <div className="space-y-4">
              {specializations.map((spec, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-800 mb-1">{spec.title}</h4>
                  <p className="text-gray-700 text-sm">{spec.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Reviews */}
        <div className="lg:w-1/3 bg-gray-50 p-4 rounded-xl mt-6 lg:mt-0">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Google Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-3">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 mr-1 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-1">"{review.text}"</p>
                <p className="text-gray-500 text-xs font-medium">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
