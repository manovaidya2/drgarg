import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationPopup from "../components/ConsultationPopup";

export default function ClarityCTA() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className="w-full bg-white px-4 sm:px-6 lg:px-[40px] py-4">
        <div className="w-full rounded-[24px] bg-gradient-to-r from-[#004226] via-[#003f25] to-[#1b4e24] px-5 sm:px-8 md:px-12 lg:px-16 py-10 md:py-14 overflow-hidden">
          <div className="max-w-[900px]">
            <h2 className="font-serif text-white text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[1.2] tracking-[-0.02em]">
              You Do Not Have to Decide Treatment
              <br className="hidden md:block" />
              Today. You Only Need Clarity.
            </h2>

            <p className="mt-5 text-white/90 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.6] max-w-[780px]">
              If you have already tried multiple options and still feel
              confused, the first step is not treatment — it is understanding
              the root cause and getting the right direction.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="button"
                onClick={() => setOpenPopup(true)}
                className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#e6692c] px-6 text-[14px] font-semibold text-white transition hover:bg-[#d95e22]"
              >
                Book Consultation
                <ArrowRight size={16} />
              </button>

              <Link
                to="/neuro-ayurveda-system"
                className="inline-flex h-[48px] items-center justify-center rounded-full border border-white/25 px-6 text-[14px] font-semibold text-white transition hover:bg-white/10"
              >
                Explore the System
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ConsultationPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </>
  );
}