import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationPopup from "../components/ConsultationPopup";

export default function AutismCTA() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className="w-full bg-white px-3 sm:px-5 lg:px-10 py-4">
        <div className="w-full rounded-[24px] bg-gradient-to-r from-[#004226] via-[#003f25] to-[#1b4e24] px-5 sm:px-8 md:px-12 lg:px-16 py-10 md:py-12">

          <div className="max-w-[900px]">

            {/* HEADING */}
            <h2 className="font-serif text-white text-[26px] sm:text-[32px] md:text-[36px] lg:text-[38px] leading-[1.2] tracking-[-0.03em]">
              Book an Autism or ADHD Consultation
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-4 text-white/90 text-[15px] sm:text-[17px] md:text-[18px] leading-[1.55] max-w-[700px]">
              Get a structured Neuro-Ayurveda assessment and a clear roadmap for your child's development.
            </p>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">

              {/* 🔥 POPUP BUTTON */}
              <button
                onClick={() => setOpenPopup(true)}
                className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#e6692c] px-6 text-[14px] font-semibold text-white transition hover:bg-[#d95e22]"
              >
                Book Autism Consultation
                <ArrowRight size={16} />
              </button>

              <Link
                to="/neuro-ayurveda-system"
                className="inline-flex h-[48px] items-center justify-center rounded-full border border-white/30 px-6 text-[14px] font-semibold text-white transition hover:bg-white/10"
              >
                Explore the System
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 🔥 POPUP */}
      <ConsultationPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </>
  );
}