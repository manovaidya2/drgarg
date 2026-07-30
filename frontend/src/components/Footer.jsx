import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#003f25] text-[#b9c9bf]">
      <div className="mx-auto max-w-[1360px] px-5 pb-10 pt-10 sm:px-8 sm:pt-12 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.6fr_0.8fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="mb-2 font-serif text-[22px] leading-tight text-white">
              Dr. Ankush Garg
            </h2>

            <div className="space-y-1 text-[14px] font-semibold leading-[1.6]">
              <p>BAMS, MPH | Ayurvedacharya</p>
              <p>PhD Research Scholar – Gut–Brain Axis</p>
              <p>Founder of Manovaidya</p>
              <p>Developer of the Neuro-Ayurveda Development System</p>
            </div>

            <div className="mt-6 space-y-3 text-[14px] font-semibold">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-1 shrink-0 text-[#d5b33d]" />
                <span>
                  Manovaidya Clinic
                  <br />
                  VS Plaza, Near Vinayak Hospital,
                  <br />
                  Atta Market, Pocket E, Sector 27,
                  <br />
                  Noida, Uttar Pradesh – 201301
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-[#d5b33d]" />
                <a href="tel:+917823838638" className="hover:text-white">
                  +91 78238 38638
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-[#d5b33d]" />
                <a href="mailto:contact@drankushgarg.in" className="hover:text-white">
                  contact@drankushgarg.in
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-[11px] uppercase tracking-[0.32em] text-white">
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
            <h3 className="mb-4 font-serif text-[11px] uppercase tracking-[0.32em] text-white">
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
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-2 px-5 py-5 text-[12px] font-semibold text-[#91a79b] sm:px-8 md:flex-row lg:px-12">
          <p>© 2026 Dr. Ankush Garg · Manovaidya. All rights reserved.</p>
          <p>Online & In-clinic consultations available across India.</p>
        </div>
      </div>
    </footer>
  );
}
