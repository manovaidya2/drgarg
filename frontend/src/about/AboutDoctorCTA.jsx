import React, { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationPopup from "../components/ConsultationPopup";
import meditationImg from "../images/mind-wellness.png";

export default function AboutDoctorCTA() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className="w-full bg-white px-4 py-4 sm:px-6 md:px-10 md:py-8">
        <div className="grid items-center gap-6 overflow-hidden rounded-[20px] bg-[#f7f8f2] px-6 py-8 sm:px-8 md:px-12 md:py-10 lg:grid-cols-[1fr_180px] lg:gap-10">
          <div>
            <h2 className="max-w-[560px] font-serif text-[24px] font-semibold leading-[1.3] text-[#075640] sm:text-[28px] md:text-[32px]">
              Looking For Structured Guidance?
            </h2>

            <p className="mt-3 max-w-[560px] text-[14.5px] font-medium leading-[1.75] text-[#45544e] sm:text-[15px]">
              If you are seeking support for child development, Autism, ADHD,
              behavioural concerns, emotional wellbeing or mind-body health,
              you can begin with a structured assessment and consultation.
            </p>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => setOpenPopup(true)}
                className="inline-flex h-[48px] items-center justify-center gap-2 rounded-[6px] bg-[#075640] px-6 text-[12.5px] font-bold uppercase tracking-[0.03em] text-white transition hover:bg-[#064834]"
              >
                <CalendarCheck size={15} />
                Book An Assessment
              </button>

              <Link
                to="/autism-adhd"
                className="inline-flex h-[48px] items-center justify-center rounded-[6px] border border-[#a9c2b4] bg-white px-6 text-[12.5px] font-bold uppercase tracking-[0.03em] text-[#075640] transition hover:bg-[#edf6ef]"
              >
                Explore Areas Of Expertise
              </Link>
            </div>
          </div>

          <img
            src={meditationImg}
            alt="Mind-body wellness"
            className="mx-auto hidden h-[190px] w-[190px] object-contain lg:block"
          />
        </div>
      </section>

      <ConsultationPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </>
  );
}
