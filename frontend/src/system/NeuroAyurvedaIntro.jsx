import React from "react";
import { Helmet } from "react-helmet-async";

export default function NeuroAyurvedaSystemSections() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://drankushgarg.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Neuro-Ayurveda Development System",
        item: "https://drankushgarg.in/neuro-ayurveda-system",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <nav className="w-full bg-white px-4 pt-6 md:px-10 md:pt-8" aria-label="Breadcrumb">
        <div className="mx-auto">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#5d625b]">
            <li className="flex items-center">
              <a href="/" className="transition-colors hover:text-[#d98923]">
                Home
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#b9cac1]">/</span>
              <span className="font-medium text-[#002b18]">
                Neuro-Ayurveda Development System
              </span>
            </li>
          </ol>
        </div>
      </nav>

      <section className="w-full bg-white py-8 md:py-10">
        <div className="mx-auto px-4 md:px-10">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#d98923]">
            Neuro-Ayurveda Development System
          </p>

          <h1 className="mb-4 max-w-3xl font-serif text-[24px] leading-[1.35] tracking-[-0.02em] text-[#002b18] sm:text-[30px] md:text-[34px]">
            Neuro-Ayurveda Development System&trade;
          </h1>

          <div className="mb-5 h-[2px] w-[50px] bg-[#d98923]" />

          <div className="max-w-4xl space-y-3 text-[14px] leading-[1.7] text-[#374151] md:text-[15px]">
            <p className="text-[18px] font-semibold leading-[1.45] text-[#002b18] md:text-[20px]">
              A Structured Framework For Understanding Development, Behaviour &amp; Emotional Wellbeing
            </p>
            <p>
              The Neuro-Ayurveda Development System&trade; is a structured
              framework developed by Dr. Ankush Garg to understand developmental,
              behavioural, emotional and wellbeing-related concerns through a
              broader and more integrated perspective.
            </p>
            <p>
              Many children, teenagers and adults experience concerns that cannot
              be understood through symptoms alone. A child may have attention
              difficulties, behavioural outbursts, speech delay, sensory concerns
              or emotional regulation challenges. An adult may experience stress,
              anxiety, overthinking, sleep problems or mind-body concerns.
            </p>
            <p>
              In many cases, these concerns are influenced by multiple
              interconnected factors. The Neuro-Ayurveda Development System&trade;
              was created to help families and individuals understand these
              deeper connections and move from confusion toward clarity.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f9faf7] py-8 md:py-10">
        <div className="mx-auto px-4 md:px-10">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#d98923]">
            Why The System Was Created
          </p>

          <div className="grid items-start gap-6 md:grid-cols-2 md:gap-8">
            <h2 className="font-serif text-[22px] leading-[1.4] tracking-[-0.02em] text-[#002b18] sm:text-[28px] md:text-[32px]">
              A Structured Way Of
              <br />
              Understanding The Whole Person
            </h2>

            <div className="border-l border-[#d98923] pl-4">
              <p className="text-[14px] leading-[1.7] text-[#374151] md:text-[15px]">
                While working with children, adults and families, Dr. Ankush
                Garg observed that many people receive labels, reports or general
                advice, but still struggle to understand what is actually
                influencing their concern.
              </p>

              <div className="mt-3 space-y-2 text-[14px] leading-[1.7] text-[#374151] md:text-[15px]">
                <p className="font-semibold text-[#002b18]">For example:</p>
                <p>Two children with autism may have completely different developmental needs.</p>
                <p>Two children with ADHD may show different patterns of attention, behaviour and emotional regulation.</p>
                <p>Two adults with anxiety may have different lifestyle, sleep, stress and emotional patterns.</p>
                <p>A child with behavioural concerns may also have sensory, communication or emotional regulation difficulties.</p>
              </div>

              <p className="mt-3 text-[14px] leading-[1.7] text-[#374151] md:text-[15px]">
                This showed the need for a more structured way of understanding
                the whole person, not just the visible symptom. The
                Neuro-Ayurveda Development System&trade; was developed to bring
                this structure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
