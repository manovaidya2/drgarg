import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaFileAlt,
  FaCalendarAlt,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaWpforms,
  FaStethoscope,
  FaBrain,
  FaHandHoldingHeart,
  FaLeaf,
  FaClinicMedical,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdHealthAndSafety, MdPsychology,} from "react-icons/md";
import { GiHealthNormal, GiHealing, GiMeditation } from "react-icons/gi";

const Sidebar = () => {
  const [openForms, setOpenForms] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 text-white h-screen flex flex-col shadow-2xl relative overflow-hidden fixed left-0 top-0">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Brand Section - Fixed at top */}
      <div className="relative p-6 border-b border-white/10 flex-shrink-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 z-10">
        <div className="flex flex-col items-center text-center">
          {/* Animated Icon Container */}
          <div className="relative mb-3 group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <MdHealthAndSafety className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Name with Stylish Typography */}
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-pink-300 via-white to-purple-300 bg-clip-text text-transparent">
                DR. ANKUSH
              </span>
            </h1>
            <h2 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                GARG
              </span>
            </h2>
            
            {/* Subtitle with decorative elements */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-6 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
              <span className="text-xs font-medium text-purple-200 tracking-wider">MENTAL WELLNESS</span>
              <div className="w-6 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </div>

            {/* Qualification Badge */}
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
              <FaLeaf className="w-3 h-3 text-green-300" />
              <span className="text-[10px] text-purple-200">Ayurvedic Expert</span>
              <FaLeaf className="w-3 h-3 text-green-300" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-1 text-center">
          <div className="p-1 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <div className="text-xs font-bold text-white">15+</div>
            <div className="text-[8px] text-purple-300">Years</div>
          </div>
          <div className="p-1 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <div className="text-xs font-bold text-white">5k+</div>
            <div className="text-[8px] text-purple-300">Patients</div>
          </div>
          <div className="p-1 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <div className="text-xs font-bold text-white">50+</div>
            <div className="text-[8px] text-purple-300">Awards</div>
          </div>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent p-4" style={{ maxHeight: "calc(100vh - 320px)" }}>
        
        {/* Student Section */}
        <div className="mb-6">


          <ul className="space-y-1">
            {[
              { to: "/dashboard", icon: FaTachometerAlt, label: "Dashboard", color: "from-cyan-400 to-blue-400" },
              { to: "/blog-list", icon: FaBook, label: "BLOGS", color: "from-green-400 to-emerald-400" },
              { to: "/case-studies", icon: FaBrain, label: "CASE STUDIES", color: "from-purple-400 to-pink-400" },
              { to: "/appointments", icon: FaCalendarAlt, label: "APPOINTMENT", color: "from-yellow-400 to-orange-400" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="relative group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 overflow-hidden"
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Hover Background Animation */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  
                  {/* Icon with Gradient */}
                  <div className={`relative z-10 p-2 bg-gradient-to-br ${item.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  
                  {/* Label */}
                  <span className="relative z-10 text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {item.label}
                  </span>

                  {/* Active Indicator */}
                  {hoveredItem === index && (
                    <div className="absolute right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Wellness Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 sticky top-0 bg-gradient-to-b from-indigo-900 to-transparent pt-1 pb-2 z-10">
            <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full"></div>
            <h3 className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
              Wellness Programs
            </h3>
          </div>

          <ul className="space-y-1">
            {[
              { to: "/meditation", icon: GiMeditation, label: "Meditation", color: "from-blue-400 to-indigo-400" },
              { to: "/ayurveda", icon: GiHealthNormal, label: "Ayurveda", color: "from-green-400 to-teal-400" },
              { to: "/therapy", icon: MdPsychology, label: "Therapy", color: "from-purple-400 to-violet-400" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className={`p-1.5 bg-gradient-to-br ${item.color} rounded-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Info - Fixed at bottom */}
      <div className="relative flex-shrink-0 p-4 border-t border-white/10 bg-gradient-to-t from-indigo-900 to-transparent">
        {/* <div className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
          <h4 className="text-xs font-semibold text-purple-200 mb-2 flex items-center gap-2">
            <div className="w-1 h-3 bg-pink-400 rounded-full"></div>
            Quick Contact
          </h4>
          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="w-3 h-3 text-green-400" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="w-3 h-3 text-blue-400" />
              <span className="truncate">dr.ankush@mentalwellness.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-3 h-3 text-red-400" />
              <span>Mumbai, India</span>
            </div> */}
          {/* </div> */}
        {/* </div> */}

        {/* Footer */}
        <div className="mt-2 text-[10px] text-center text-purple-300/50">
          <p>© 2024 Dr. Ankush Garg</p>
          <p>All rights reserved</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
        
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
        
        /* Custom Scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;