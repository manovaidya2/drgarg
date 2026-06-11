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
          title: "Teenage Mental Health | Dr. Ankush Garg Neuro-Ayurveda",
          description:
            "Holistic teenage mental health support using Neuro-Ayurveda. Address anxiety, behaviour issues, screen addiction, mood swings, and emotional struggles in teens.",
          keywords:
            "teenage mental health, teen anxiety, teen depression, behaviour issues teens, screen addiction teens, neuro ayurveda teens, Dr Ankush Garg",
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
