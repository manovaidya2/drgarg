import React from "react";

export default function BigTruthSection() {
  return (
    <section className="w-full bg-[#f8f3ea] py-10 md:py-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="max-w-[820px]">
          <p className="text-[#d98923] text-[11px] uppercase tracking-[0.32em] font-medium mb-4">
            The Big Truth
          </p>

          <h2 className="font-serif text-[#002b18] text-[28px] md:text-[32px] leading-[1.25] font-normal mb-5">
            Treatment Does Not Fail. The
            <br />
            System Is Often Incomplete.
          </h2>

          <p className="text-[#33423d] text-[16px] md:text-[17px] leading-[1.6] max-w-[900px]">
            Therapy, counselling, medicine, diet, and lifestyle correction all
            have their role. But when applied separately — without understanding
            the complete internal system — results often remain limited.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          {/* CARD 1 */}
          <div className="bg-white rounded-[14px] border border-[#ddd8cf] shadow-[0_6px_18px_rgba(0,0,0,0.03)] px-6 py-6 min-h-[180px]">
            <p className="text-[#d98923] text-[11px] uppercase tracking-[0.32em] font-medium mb-3">
              In Autism
            </p>

            <p className="text-[#253733] text-[15px] md:text-[16px] leading-[1.6]">
              Therapy may train the child externally, but if the brain is not
              internally ready, if sensory processing is disturbed, if the
              gut-brain axis is weak, and if neural pathways are not activated —
              the child may not absorb therapy properly.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-[14px] border border-[#ddd8cf] shadow-[0_6px_18px_rgba(0,0,0,0.03)] px-6 py-6 min-h-[180px]">
            <p className="text-[#d98923] text-[11px] uppercase tracking-[0.32em] font-medium mb-3">
              In Mental Health
            </p>

            <p className="text-[#253733] text-[15px] md:text-[16px] leading-[1.6]">
              Counselling may give insight, but if the nervous system remains
              overloaded and the internal biology stays disturbed, long-term
              recovery becomes difficult — for anxiety, depression, OCD, or
              overthinking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}