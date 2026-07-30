import React from "react";
import { GlobalSEO } from "../components/SEOProvider";

import AdultCommonProblems from "../teenage/AdultCommonProblems";
import ReframingSection from "../teenage/ReframingSection";
import IntegratedApproachSection from "../teenage/IntegratedApproachSection";
import MentalHealthClarityCTA from "../teenage/MentalHealthClarityCTA";
import TeenageMentalHealthHero from "../teenage/TeenageMentalHealthHero";

function Adult() {
  return (
    <>
      <GlobalSEO
        seo={{
          title: "Teenage Mental Health | Dr. Ankush Garg",
          description:
            "Teenagers may show struggle through silence, anger, isolation or screen addiction. Understanding comes first, then the right support.",
          keywords:
            "teenage mental health, teen anxiety, teen depression, behaviour patterns, screen addiction, isolation, mood swings, emotional support, Dr Ankush Garg",
          canonical: "https://drankushgarg.in/teenage-mental-health",
          image: "https://drankushgarg.in/og-image.jpg",
        }}
      />

      <div>
        <TeenageMentalHealthHero />
        <AdultCommonProblems />
        <ReframingSection />
        <IntegratedApproachSection />
        <MentalHealthClarityCTA />
      </div>
    </>
  );
}

export default Adult;
