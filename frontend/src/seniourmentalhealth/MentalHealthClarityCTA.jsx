import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ConsultationPopup from "../components/ConsultationPopup";

export default function MentalHealthClarityCTA() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className="w-full bg-white px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        <div className=" mx-auto">
          <div className="rounded-[18px] bg-gradient-to-r from-[#003f26] via-[#003f26] to-[#1e5128] px-8 sm:px-12 lg:px-16 py-12 sm:py-14 shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
            <div className="max-w-[780px]">

              {/* Heading */}
              <h2 className="font-serif text-white text-[28px] sm:text-[34px] leading-tight tracking-[-0.03em]">
                Book a Senior Mental Health Consultation
              </h2>

              {/* Description */}
              <p className="mt-5 text-white/90 text-[16px] sm:text-[18px] font-medium leading-relaxed">
                A respectful, gentle assessment for seniors and caregivers who deserve thoughtful, root-cause care.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">

                {/* 🔥 POPUP BUTTON */}
                <button
                  onClick={() => setOpenPopup(true)}
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full bg-[#ef6b2a] px-6 text-[14px] font-bold text-white transition hover:bg-[#dc5f22]"
                >
                  Book Senior Consultation
                  <ArrowRight size={16} />
                </button>

                <Link
                  to="/senior-program"
                  className="inline-flex h-[46px] items-center justify-center rounded-full border border-white/25 px-6 text-[14px] font-bold text-white transition hover:bg-white/10"
                >
                  Explore the System
                </Link>
              </div>

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