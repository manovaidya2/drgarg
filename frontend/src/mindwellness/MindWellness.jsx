import React from "react";
import img from "../images/mind-wellness.png";
import ContactForm from "../components/ContactForm";

const MindWellness = () => {
  return (
    <div className="max-w-7xl mx-auto px-10 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2">
          <div className="flex justify-center mb-6">
            <img src={img} alt="Mind Wellness" className="max-w-sm" />
          </div>

          <span className="inline-block border border-orange-400 text-orange-500 text-sm px-4 py-1 rounded mb-4">
            Mind Wellness
          </span>

          <p className="text-gray-600 mt-4">
            Welcome to Mano Vaidya, your ultimate destination for holistic mental wellness.
            In a world brimming with stressors and challenges, nurturing your mental well-being
            is paramount. At Mano Vaidya, we believe in empowering individuals to unlock their
            true potential through a blend of traditional wisdom and modern approaches to mental health.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            Understanding Mental Wellness:
          </h2>
          <p className="text-gray-600">
            Mental wellness is not merely the absence of illness; it encompasses a state of
            flourishing where individuals can cope with life’s challenges, work productively,
            and contribute to their communities.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            Holistic Approach to Mental Wellness:
          </h2>
          <p className="text-gray-600">
            At Mano Vaidya, we advocate for a holistic approach to mental wellness. This approach
            acknowledges the interconnectedness of various aspects of our lives.
          </p>

          <h2 className="text-lg font-semibold mt-8 mb-2 uppercase text-gray-700">
            Traditional Wisdom Meets Modern Science:
          </h2>
          <p className="text-gray-600">
            Our approach integrates time-tested practices from Ayurveda, yoga, and mindfulness
            with cutting-edge scientific research in psychology and neuroscience.
          </p>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">
          {/* Wellness List */}
          <div className="border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Mind Wellness</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>› Daily Stress & Overthinking</li>
              <li>› Depression</li>
              <li>› Anxiety</li>
              <li>› Insomnia</li>
              <li>› Mood Swings</li>
              <li>› Sexual Desire</li>
              <li>› Anti Aging</li>
            </ul>
          </div>

          {/* Reusable Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default MindWellness;
