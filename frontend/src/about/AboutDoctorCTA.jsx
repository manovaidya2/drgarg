import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationPopup from "../components/ConsultationPopup";

export default function AboutDoctorCTA() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className="w-full bg-white px-3 py-4 sm:px-5 lg:px-10">
        <div className="w-full rounded-[24px] bg-gradient-to-r from-[#004226] via-[#003f25] to-[#1b4e24] px-5 py-10 sm:px-8 md:px-12 md:py-12 lg:px-16">
          <h2 className="font-serif text-[26px] leading-[1.2] tracking-[-0.03em] text-white sm:text-[32px] md:text-[36px] lg:text-[38px]">
            Looking For Structured Guidance?
          </h2>

          <p className="mt-4 max-w-[780px] text-[15px] leading-[1.55] text-white/90 sm:text-[17px] md:text-[18px]">
            If you are seeking support for child development, Autism, ADHD, behavioural concerns, emotional wellbeing or mind-body health, you can begin with a structured assessment and consultation.
          </p>

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => setOpenPopup(true)}
              className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#e6692c] px-6 text-[14px] font-semibold text-white transition hover:bg-[#d95e22]"
            >
              Book An Assessment
              <ArrowRight size={16} />
            </button>

            <Link
              to="/autism-adhd"
              className="inline-flex h-[48px] items-center justify-center rounded-full border border-white/30 px-6 text-[14px] font-semibold text-white transition hover:bg-white/10"
            >
              Explore Areas Of Expertise
            </Link>
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
