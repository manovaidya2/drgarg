import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationPopup from "../components/ConsultationPopup";

export default function PhilosophyCTA() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto px-5 md:px-10">
          <p className="mb-9 text-[10px] uppercase tracking-[0.42em] text-[#d98923]">
            Philosophy
          </p>

          <div className="max-w-[720px] border-l border-[#d98923] pl-6">
            <h2 className="font-serif text-[28px] leading-[1.45] tracking-[-0.01em] text-[#002b18] sm:text-[34px] md:text-[36px]">
              Health concerns often need careful assessment, context and
              structured guidance across body, mind, lifestyle and wellbeing.
            </h2>

            <p className="mt-4 text-[11px] uppercase tracking-[0.42em] text-[#b7742c]">
              Dr. Ankush Garg
            </p>
          </div>
        </div>

        <div className="mt-[120px] w-full px-4 md:px-8 lg:px-12">
          <div className="w-full rounded-[32px] bg-gradient-to-r from-[#004226] via-[#003f25] to-[#1b4e24] px-6 py-12 sm:px-10 md:px-16 md:py-16">
            <div className="max-w-[900px]">
              <h3 className="font-serif text-[28px] leading-[1.2] tracking-[-0.02em] text-white sm:text-[34px] md:text-[38px]">
                Begin With a Structured Consultation.
              </h3>

              <p className="mt-5 max-w-[750px] text-[16px] leading-[1.6] text-white/90 md:text-[18px]">
                Book a consultation with Dr. Ankush Garg, Ayurvedacharya and
                Founder of Manovaidya, to understand your child's or your own
                concerns through structured Neuro-Ayurveda guidance.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
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

      <ConsultationPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </>
  );
}
