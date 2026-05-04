import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, HeartPulse, Moon, Activity } from "lucide-react";
import ConsultationPopup from "../components/ConsultationPopup";

export default function TeenageMentalHealthHero() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className="w-full bg-[#fbfaf7] py-14 sm:py-16 lg:py-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7ded6] bg-white px-4 py-2 text-[11px] tracking-[0.25em] uppercase text-[#00402a] mb-5">
              Teenage Mental Health
            </div>

            <h1 className="font-serif text-[#003b27] text-[34px] sm:text-[44px] md:text-[52px] lg:text-[54px] leading-[1.1] tracking-[-0.03em]">
              Teenagers Don’t Always Say
              <br />
              <span className="text-[#e0aa3e]">They Are Struggling</span>
            </h1>

            <p className="mt-5 text-[16px] sm:text-[18px] text-[#2f3f4a] leading-[1.7] max-w-[600px] mx-auto lg:mx-0">
              Sometimes{" "}
              <span className="font-semibold">
                silence, anger, isolation, or screen addiction
              </span>{" "}
              is their way of coping. Understanding comes first — then the right
              support.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => setOpenPopup(true)}
                className="inline-flex items-center justify-center gap-2 h-[50px] px-7 rounded-full bg-[#00402a] text-white text-[15px] font-semibold hover:bg-[#002f1f] transition"
              >
                Book Consultation
                <ArrowRight size={18} />
              </button>

              <Link
                to="/teenage-program"
                className="inline-flex items-center justify-center h-[50px] px-7 rounded-full border border-[#c8d3cc] text-[#00402a] text-[14px] font-semibold bg-white hover:bg-[#f7f7f7] transition"
              >
                Explore Program
              </Link>
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: Brain,
                title: "Brain Development",
                desc: "Focus, memory & emotional growth during teenage years",
              },
              {
                icon: HeartPulse,
                title: "Hormones & Mood",
                desc: "Mood swings, irritability & emotional sensitivity",
              },
              {
                icon: Activity,
                title: "Behaviour Patterns",
                desc: "Anger, withdrawal & coping mechanisms",
              },
              {
                icon: Moon,
                title: "Sleep & Screen Use",
                desc: "Sleep disruption & digital dependency impact",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-sm">
                  <Icon className="text-[#00402a] mb-3" size={26} />
                  <h3 className="font-semibold text-[#0f172a] text-[15px] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#64748b]">{item.desc}</p>
                </div>
              );
            })}
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