import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1d5a57] text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ABOUT */}
        <div>
          <h3 className="font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            About
          </h3>
          <p className="text-sm text-gray-200 leading-6">
            Ayurvedic medicine focuses on treating the root cause of disease.
            Consult with an experienced Ayurveda specialist for personalized care.
          </p>

          <div className="flex gap-3 mt-4">
            <a href="#" className="social-icon"><FaTwitter size={14} /></a>
            <a href="#" className="social-icon"><FaFacebookF size={14} /></a>
            <a href="#" className="social-icon"><FaLinkedinIn size={14} /></a>
            <a href="#" className="social-icon"><FaInstagram size={14} /></a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="text-sm text-gray-200 space-y-2">
            <li><Link to="/about" className="hover:text-white">About Dr. Ankush Garg</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blogs</Link></li>
            <li><Link to="/case-study" className="hover:text-white">Case Studies</Link></li>
            <li><Link to="/media-coverage" className="hover:text-white">Media Coverage</Link></li>
            <li><Link to="/appointment" className="hover:text-white">Book Consultation</Link></li>
          </ul>
        </div>

        {/* TREATMENTS */}
        <div>
          <h3 className="font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Treatments
          </h3>
          <ul className="text-sm text-gray-200 space-y-2">
            <li><a href="https://manovaidya.in/depression-treatment.php" target="_blank" rel="noreferrer">Depression</a></li>
            <li><a href="https://manovaidya.in/anxiety-disorder-treatment.php" target="_blank" rel="noreferrer">Anxiety</a></li>
            <li><a href="https://manovaidya.in/autism-treatment.php" target="_blank" rel="noreferrer">Autism</a></li>
            <li><a href="https://manovaidya.in/ocd-treatment.php" target="_blank" rel="noreferrer">OCD</a></li>
            <li><a href="https://manovaidya.in/schizophrenia.php" target="_blank" rel="noreferrer">Schizophrenia</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-lg mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Contact
          </h3>
          <ul className="text-sm text-gray-200 space-y-2">
            <li>India</li>
            <li>📞 +91-7823838638</li>
            <li>📞 +91-8860247763</li>
            <li>📧 manovaidya2gmail.com</li>
            {/* <li>📧 dr.ankush@gmail.com</li> */}
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-10 border-t border-gray-400 pt-6 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Dr. Ankush Garg. All Rights Reserved
      </div>

      {/* REUSABLE STYLE */}
      <style>
        {`
          .social-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9999px;
            background: white;
            color: #7e22ce;
            transition: all .3s;
          }
          .social-icon:hover {
            background: #7e22ce;
            color: white;
          }
        `}
      </style>
    </footer>
  );
}
