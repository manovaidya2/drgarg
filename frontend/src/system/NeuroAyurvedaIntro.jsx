import React from "react";
import { Helmet } from "react-helmet-async";

export default function NeuroAyurvedaSystemSections() {
  // Breadcrumb Schema Data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://drankushgarg.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Neuro-Ayurveda System",
        "item": "https://drankushgarg.in/neuro-ayurveda-system"
      }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Visible Breadcrumb Navigation */}
      <nav className="w-full bg-white pt-6 md:pt-8 px-4 md:px-10" aria-label="Breadcrumb">
        <div className="mx-auto">
          <ol className="flex flex-wrap items-center gap-2 text-[#5d625b] text-sm">
            <li className="flex items-center">
              <a href="/" className="hover:text-[#d98923] transition-colors">
                Home
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#b9cac1]">/</span>
              <span className="text-[#002b18] font-medium">Neuro-Ayurveda System</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* SECTION 1: THE SYSTEM */}
      <section className="w-full bg-white py-8 md:py-10">
        <div className="mx-auto px-4 md:px-10">
          <p className="text-[#d98923] text-[10px] uppercase tracking-[0.35em] mb-4">
            The System
          </p>

          <h1 className="font-serif text-[#002b18] text-[24px] sm:text-[30px] md:text-[34px] leading-[1.35] tracking-[-0.02em] max-w-2xl mb-4">
            The Neuro-Ayurveda System
          </h1>

          <div className="w-[50px] h-[2px] bg-[#d98923] mb-5" />

          <p className="text-[#374151] text-[14px] md:text-[15px] leading-[1.7] max-w-2xl">
            A root-cause treatment model developed by Dr. Ankush Garg for
            autism, ADHD, mental health, and neurodevelopmental disorders —
            built on the connection between brain, gut, nervous system,
            emotions, and behaviour.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE FOUNDATION */}
      <section className="w-full bg-[#f9faf7] py-8 md:py-10">
        <div className="mx-auto px-4 md:px-10">
          <p className="text-[#d98923] text-[10px] uppercase tracking-[0.35em] mb-4">
            The Foundation
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
            <h2 className="font-serif text-[#002b18] text-[22px] sm:text-[28px] md:text-[32px] leading-[1.4] tracking-[-0.02em]">
              Designed for Patients Who Feel
              <br />
              Stuck or Only Partially Improved
            </h2>

            <div className="border-l border-[#d98923] pl-4">
              <p className="text-[#374151] text-[14px] md:text-[15px] leading-[1.7]">
                The Neuro-Ayurveda System is a structured treatment model that
                works on the connection between the brain, gut, nervous system,
                emotions, and behaviour.
              </p>

              <p className="text-[#374151] text-[14px] md:text-[15px] leading-[1.7] mt-3">
                It is designed for patients who have tried conventional
                approaches but still feel stuck, confused, or only partially
                improved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}