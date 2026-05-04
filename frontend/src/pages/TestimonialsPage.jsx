import React from "react";
import { Quote, ArrowRight } from "lucide-react";
import ConsultationPopup from "../components/ConsultationPopup";
import { useState } from "react";



export default function TestimonialsPage() {
    const [openPopup, setOpenPopup] = useState(false);
  const testimonials = [
    {
      message:
        "For the first time, someone explained why therapy alone was not giving results. After following the system, we started seeing better response and engagement in our child.",
      name: "Parent",
      role: "Autism Care",
    },
    {
      message:
        "We had tried different therapies for our child's autism, but we were confused. At Manovaidya, we understood the brain-gut-behaviour connection and got a clear roadmap.",
      name: "Parent",
      role: "Autism Spectrum",
    },
    {
      message:
        "My teenager was anxious, angry, and not talking to us. The approach helped us understand the emotional pressure behind the behaviour.",
      name: "Parent of Teenager",
      role: "",
    },
    {
      message:
        "I consulted for anxiety and overthinking. I realized it was not only a thought problem, but a nervous system issue. The treatment gave me clarity and stability.",
      name: "Adult Patient",
      role: "",
    },
    {
      message:
        "The biggest difference was tracking. Every month we could see what was changing.",
      name: "Parent",
      role: "Long-term Care",
    },
  ];

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#fbfaf6]">
        <div className="absolute -top-20 -right-20 h-[220px] w-[220px] rounded-full bg-[#eadfca]/40 blur-2xl" />

        <div className="mx-auto  px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 md:pt-12 pb-10 sm:pb-12 md:pb-14">
          <div className="max-w-[850px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c8d5cf] bg-white/70 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d8a63b]" />
              <span className="text-[#003f26] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.25em]">
                Testimonials
              </span>
            </div>

            <h1 className="mt-5 font-serif text-[#003f26] text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] leading-[1.05] tracking-[-0.025em]">
              Stories of Clarity, Progress & Trust
            </h1>

            <p className="mt-4 max-w-[720px] text-[#36454f] text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65]">
              What families and patients say after experiencing the
              Neuro-Ayurveda System.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="w-full bg-[#f6f4ef] py-10 sm:py-12 md:py-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9">
            {testimonials.map((item, index) => (
              <article
                key={index}
                className="group bg-[#fffefa] border border-[#ddd8ce] rounded-[22px] px-7 sm:px-9 md:px-7 lg:px-8 py-5 sm:py-11 md:py-5 min-h-[250px] shadow-[0_18px_45px_rgba(20,35,28,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(20,35,28,0.10)]"
              >
                <Quote
                  size={36}
                  strokeWidth={2.3}
                  className="text-[#dda63b] fill-none mb-7"
                />

                <p className="font-serif text-[#071f1b] text-[18px] sm:text-[20px] lg:text-[16px] leading-[1.65] tracking-[-0.018em]">
                  “{item.message}”
                </p>

                <p className="mt-8 text-[#1f3f38] text-[16px] sm:text-[16px] leading-relaxed font-medium">
                  — {item.name}
                  {item.role ? `, ${item.role}` : ""}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
{/* CTA SECTION */}
<section className="w-full bg-[#f6f4ef] px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
  <div className="mx-auto max-w-[1600px] rounded-[22px] bg-gradient-to-r from-[#004225] via-[#053f24] to-[#1f5027] px-6 sm:px-10 lg:px-16 py-10 sm:py-12 lg:py-14">
    
    <div className="max-w-[700px]">
      
      <h2 className="font-serif text-white text-[26px] sm:text-[32px] lg:text-[36px] leading-[1.2] tracking-[-0.02em]">
        Talk to Our Team
      </h2>

      <p className="mt-4 text-white/90 text-[15px] sm:text-[17px] lg:text-[18px] leading-relaxed font-medium">
        Begin your own story of clarity with a structured first consultation.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        
        {/* 🔥 POPUP BUTTON */}
        <button
          onClick={() => setOpenPopup(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e86f2d] px-6 py-3 text-white text-[14px] sm:text-[15px] font-semibold transition-all duration-300 hover:bg-[#d96122]"
        >
          Talk to Our Team
          <ArrowRight size={18} strokeWidth={2.2} />
        </button>

        <a
          href="/system"
          className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-white text-[14px] sm:text-[15px] font-semibold transition-all duration-300 hover:bg-white/10"
        >
          Explore the System
        </a>

      </div>
    </div>
  </div>
</section>
<ConsultationPopup
  isOpen={openPopup}
  onClose={() => setOpenPopup(false)}
/>
    </div>
  );
}