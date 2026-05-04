import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#003f25] text-[#b9c9bf]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 sm:pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_0.8fr_0.9fr] gap-8 lg:gap-16">
          
          <div>
            <h2 className="font-serif text-white text-[22px] leading-tight mb-2">
              Dr. Ankush Garg
            </h2>

            <p className="text-[13px] font-semibold mb-4">
              BAMS, MPH, PhD (Gut-Brain Axis Research)
            </p>

            <p className="max-w-[560px] text-[15px] leading-[1.55] font-semibold">
              Ayurvedacharya, Neuro-Ayurveda Specialist, and developer of the
              Neuro-Ayurveda System — a root-cause Brain–Gut–Behaviour treatment
              model for autism, ADHD, and mental health across all ages.
            </p>

            <div className="mt-6 space-y-2 text-[14px] font-semibold">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#d5b33d] mt-1 flex-shrink-0" />
                <span>
                  Manovaidya, near Vinayak Hospital, Atta Market, Pocket E,
                  Sector 27, Noida, UP 201301
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#d5b33d] flex-shrink-0" />
                <a href="tel:07823838638" className="hover:text-white">
                  078238 38638
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#d5b33d] flex-shrink-0" />
                <a href="mailto:hello@manovaidya.in" className="hover:text-white">
                  hello@manovaidya.in
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-[11px] tracking-[0.32em] uppercase font-serif mb-4">
              Explore
            </h3>

            <ul className="space-y-2 text-[14px] font-semibold">
              <li><Link to="/about" className="hover:text-white">About Dr. Ankush</Link></li>
              <li><Link to="/neuro-ayurveda-system" className="hover:text-white">Neuro-Ayurveda System</Link></li>
              <li><Link to="/autism-adhd" className="hover:text-white">Autism & ADHD</Link></li>
              <li><Link to="/case-study" className="hover:text-white">Case Studies</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-[11px] tracking-[0.32em] uppercase font-serif mb-4">
              Care
            </h3>

            <ul className="space-y-2 text-[14px] font-semibold">
              <li><Link to="/adult-mental-health" className="hover:text-white">Adult Mental Health</Link></li>
              <li><Link to="/teenage-mental-health" className="hover:text-white">Teenage Mental Health</Link></li>
              <li><Link to="/senior-mental-health" className="hover:text-white">Senior Mental Health</Link></li>
              <li><Link to="/testimonials" className="hover:text-white">Testimonials</Link></li>
              <li><Link to="/appointment" className="hover:text-white">Book Consultation</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col md:flex-row justify-between gap-2 text-[12px] font-semibold text-[#91a79b]">
          <p>© 2026 Dr. Ankush Garg · Manovaidya. All rights reserved.</p>
          <p>Online & In-clinic consultations available across India.</p>
        </div>
      </div>
    </footer>
  );
}