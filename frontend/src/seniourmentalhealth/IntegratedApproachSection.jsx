import React from "react";
import { Link } from "react-router-dom";

export default function IntegratedApproachSection() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-10 py-8 sm:py-9">
      <div className=" mx-auto">
        <p className="text-[#d99b2f] uppercase tracking-[0.35em] text-[11px] sm:text-[12px] font-medium mb-3">
          Senior Mental Health
        </p>

        <h2 className="font-serif text-[#073821] text-[26px] sm:text-[32px] md:text-[36px] lg:text-[38px] leading-[1.12] tracking-[-0.03em]">
          Gentle, Root-Cause Care for Seniors
        </h2>

        <p className="mt-6 max-w-[900px] text-[#263b3d] text-[15px] sm:text-[17px] leading-[1.6]">
          Senior mental health care focuses on{" "}
          <strong>
            brain nourishment, nervous system calming, gut and metabolism
            support, sleep correction, emotional support, lifestyle rhythm, and
            Ayurvedic rejuvenation.
          </strong>{" "}
          Memory decline, poor sleep, anxiety, loneliness, brain fog, and
          emotional insecurity should not be ignored as “normal aging.” Read
          more about{" "}
          <Link
            to="/brain-nourishment"
            className="text-[#003b27] underline underline-offset-[3px]"
          >
            brain nourishment
          </Link>{" "}
          for supporting cognitive health in later years.
        </p>
      </div>
    </section>
  );
}