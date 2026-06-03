import React from "react";
import { Helmet } from "react-helmet-async";

export default function AboutDoctorIntro() {
  // Breadcrumb Schema Data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://drankushgarg.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Doctor",
        "item": "https://drankushgarg.com/about-doctor"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Dr. Ankush Garg - Ayurvedic Neurologist & Autism Doctor",
        "item": "https://drankushgarg.com/about-doctor"
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

      <section className="w-full bg-[#f8f3ea] py-10 md:py-12">
        <div className="w-full px-5 md:px-10 lg:px-10">
          <div className="max-w-[980px]">
            {/* Inline Breadcrumb Navigation (visible for users) */}
            <nav className="mb-4 text-sm" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[#5d625b]">
                <li className="flex items-center">
                  <a href="/" className="hover:text-[#d98923] transition-colors">
                    Home
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#b9cac1]">/</span>
                  <span className="text-[#002b18] font-medium">About Doctor</span>
                </li>
              </ol>
            </nav>

            <p className="text-[#d98923] text-[11px] uppercase tracking-[0.36em] font-medium mb-3">
              About the Doctor
            </p>

            <h2 className="font-serif text-[#002b18] text-[28px] md:text-[36px] leading-[1.18] font-normal mb-5">
              Dr. Ankush Garg — India&apos;s No.1 Autism Doctor & Leading
              Ayurvedic Neurologist
            </h2>

            <div className="bg-white rounded-[16px] border border-[#ddd8cf] shadow-[0_6px_18px_rgba(0,0,0,0.03)] px-5 md:px-7 py-5 md:py-6">
              <p className="text-[#33423d] text-[15px] md:text-[17px] leading-[1.7]">
                BAMS · MPH · PhD{" "}
                <span className="text-[#002b18] font-semibold">
                  (Gut-Brain Axis Research)
                </span>{" "}
                · Ayurvedacharya · Neuro-Ayurveda Specialist · Founder of
                Manovaidya · Developer of the Neuro-Ayurveda System.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}