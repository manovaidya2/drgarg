import React from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1d5a57] text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h3 className="font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            About
          </h3>
          <p className="text-sm text-gray-200 leading-6">
            Ayurvedic medicine is not as simple to take as allopathic medicine. 
            To get the ideal combination for your particular disease and body type, 
            you must consult with an Ayurveda specialist.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-purple-600 hover:bg-purple-600 hover:text-white transition">
              <FaTwitter size={14} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-purple-600 hover:bg-purple-600 hover:text-white transition">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-purple-600 hover:bg-purple-600 hover:text-white transition">
              <FaLinkedinIn size={14} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-purple-600 hover:bg-purple-600 hover:text-white transition">
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links 1 */}
        <div>
          <h3 className="font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="text-sm text-gray-200 space-y-2">
            <li>About Me</li>
            <li>Training & Mentorship</li>
            <li>Prices & Payments</li>
            <li>Specialities</li>
            <li>Professional Experience</li>
          </ul>
        </div>

        {/* Quick Links 2 */}
        <div>
          <h3 className="font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="text-sm text-gray-200 space-y-2">
            <li>About us</li>
            <li>Mind wellness</li>
            <li>Mind Disease</li>
            <li>Performance Enhancement</li>
            <li>Case Studies</li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Community
          </h3>
          <ul className="text-sm text-gray-200 space-y-2">
            <li>India</li>
            <li>+91-7823838638</li>
            <li>+91-8860247763</li>
            <li>manahvedagroup@gmail.in</li>
            <li>DR-Ankush@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-10 border-t border-gray-400 pt-6 text-center text-gray-300 text-sm">
        Copyright {new Date().getFullYear()} | Dr. Ankush Garg. All Rights Reserved
      </div>
    </footer>
  );
}
