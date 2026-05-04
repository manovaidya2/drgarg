import React from "react";
import { Link } from "react-router-dom";

export default function TeenageApproachSection() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-9">
      <div className="m">

        {/* Label */}
        <p className="text-[#d99b2f] uppercase tracking-[0.35em] text-[11px] sm:text-[12px] font-medium mb-3">
          The Approach
        </p>

        {/* Heading */}
        <h2 className="font-serif text-[#073821] text-[26px] sm:text-[32px] md:text-[36px] lg:text-[38px] leading-[1.12] tracking-[-0.03em]">
          Treatment That Listens First
        </h2>

        {/* Paragraph */}
        <p className="mt-6 max-w-[900px] text-[#263b3d] text-[15px] sm:text-[17px] leading-[1.6]">
          Care includes{" "}
          <strong>
            emotional understanding, nervous system calming, sleep correction,
            screen pattern correction, confidence rebuilding, parent-child
            communication guidance, and brain-gut-behaviour support.
          </strong>{" "}
          Read our{" "}
          <Link
            to="/parent-child-communication"
            className="text-[#003b27] underline underline-offset-[3px]"
          >
            parent-child communication blog
          </Link>{" "}
          for practical guidance.
        </p>

      </div>
    </section>
  );
}