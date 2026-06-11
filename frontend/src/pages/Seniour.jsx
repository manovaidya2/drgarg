import React from "react";
import { GlobalSEO } from "../components/SEOProvider";

// 👉 sirf folder change kiya hai (adult → seniourmentalhealth)
import AdultMentalHealthSection from "../seniourmentalhealth/AdultMentalHealthSection";
import AdultCommonProblems from "../seniourmentalhealth/AdultCommonProblems";
import ReframingSection from "../seniourmentalhealth/ReframingSection";
import IntegratedApproachSection from "../seniourmentalhealth/IntegratedApproachSection";
import MentalHealthClarityCTA from "../seniourmentalhealth/MentalHealthClarityCTA";

function Seniour() {
  return (
    <>
      <GlobalSEO
        seo={{
          title: "Senior Mental Health Care | Dr. Ankush Garg Neuro-Ayurveda",
          description:
            "Gentle and root-cause based mental health care for seniors. Address memory decline, anxiety, sleep problems, brain fog, and emotional well-being.",
          keywords:
            "senior mental health, memory loss elderly, anxiety in seniors, sleep issues elderly, brain fog elderly, Dr Ankush Garg",
          canonical: "https://drankushgarg.in/seniour-mental-health",
          image: "https://drankushgarg.in/og-image.jpg",
        }}
      />

      <div>
        <AdultMentalHealthSection />
        <AdultCommonProblems />
        <ReframingSection />
        <IntegratedApproachSection />
        <MentalHealthClarityCTA />
      </div>
    </>
  );
}

export default Seniour;
