import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationPopup from "../components/ConsultationPopup";

export default function PhilosophyCTA() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className="w-full bg-white py-10 md:py-14">

        {/* PHILOSOPHY */}
        <div className=" mx-auto px-5 md:px-10">
          <p className="text-[#d98923] text-[10px] uppercase tracking-[0.42em] mb-9">
            Philosophy
          </p>

          <div className="border-l border-[#d98923] pl-6 max-w-[720px]">
            <h2 className="font-serif text-[#002b18] text-[28px] sm:text-[34px] md:text-[36px] leading-[1.45] tracking-[-0.01em]">
              “Disease is not just a symptom. It is a signal. Heal
              the signal at its source — the brain, the gut, the
              nervous system — and the symptom dissolves on its
              own.”
            </h2>

            <p className="mt-4 text-[#b7742c] text-[11px] uppercase tracking-[0.42em]">
              — Dr. Ankush Garg
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full mt-[120px] px-4 md:px-8 lg:px-12">
          <div className="w-full rounded-[32px] bg-gradient-to-r from-[#004226] via-[#003f25] to-[#1b4e24] px-6 sm:px-10 md:px-16 py-12 md:py-16">

            <div className="max-w-[900px]">
              <h3 className="font-serif text-white text-[28px] sm:text-[34px] md:text-[38px] leading-[1.2] tracking-[-0.02em]">
                Begin With the Right Doctor. Begin With Clarity.
              </h3>

              <p className="mt-5 text-white/90 text-[16px] md:text-[18px] leading-[1.6] max-w-[750px]">
                Book a consultation with Dr. Ankush Garg — India's No.1 autism doctor
                and leading Ayurvedic neurologist — and understand your child's or
                your own condition through the Neuro-Ayurveda System.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">

                {/* 🔥 POPUP BUTTON */}
                <button
                  onClick={() => setOpenPopup(true)}
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#e6692c] px-7 text-[15px] font-semibold text-white transition hover:bg-[#d95e22]"
                >
                  Book Consultation
                  <ArrowRight size={16} />
                </button>

                <Link
                  to="/neuro-ayurveda-system"
                  className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/30 px-7 text-[15px] font-semibold text-white transition hover:bg-white/10"
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