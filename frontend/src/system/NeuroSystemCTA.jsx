import React, { useState } from "react";
import { CalendarCheck, Leaf, TreePine } from "lucide-react";
import ConsultationPopup from "../components/ConsultationPopup";

export default function NeuroSystemCTA() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className="w-full bg-white px-4 py-4 sm:px-6 md:px-10 md:py-6">
        <div className="overflow-hidden rounded-[20px] bg-[#f7f8f2]">
          <div className="grid items-center gap-6 px-5 py-8 sm:px-8 md:px-10 md:py-9 lg:grid-cols-[110px_1fr_auto] lg:gap-8">
            <div className="relative mx-auto hidden h-[110px] w-[110px] place-items-center rounded-full bg-white shadow-sm lg:grid">
              <TreePine size={48} strokeWidth={1.4} className="text-[#075640]" />
              <Leaf size={24} strokeWidth={1.6} className="absolute -right-2 top-2 rotate-12 text-[#a9c98f]" />
            </div>

            <div>
              <h2 className="font-serif text-[22px] font-semibold leading-[1.3] text-[#075640] sm:text-[26px]">
                Want To Go Deeper Into The System?
              </h2>
              <p className="mt-2 max-w-[560px] text-[14.5px] font-medium leading-[1.7] text-[#45544e]">
                Explore each of the five pillars in detail, or speak directly
                with Dr. Ankush Garg to understand what applies to your
                situation.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
              <a
                href="#five-pillars"
                className="inline-flex h-[48px] w-full items-center justify-center rounded-[6px] border border-[#a9c2b4] bg-white px-6 text-[12.5px] font-bold uppercase tracking-[0.03em] text-[#075640] transition hover:bg-[#edf6ef] sm:w-auto lg:w-full"
              >
                Explore The Pillars
              </a>
              <button
                onClick={() => setOpenPopup(true)}
                className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#075640] px-6 text-[12.5px] font-bold uppercase tracking-[0.03em] text-white transition hover:bg-[#064834] sm:w-auto lg:w-full"
              >
                <CalendarCheck size={15} />
                Book Assessment
              </button>
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
