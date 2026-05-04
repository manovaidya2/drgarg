import React from "react";
import { Helmet } from "react-helmet-async";

// 👉 sirf folder change kiya hai (adult → seniourmentalhealth)
import AdultMentalHealthSection from "../seniourmentalhealth/AdultMentalHealthSection";
import AdultCommonProblems from "../seniourmentalhealth/AdultCommonProblems";
import ReframingSection from "../seniourmentalhealth/ReframingSection";
import IntegratedApproachSection from "../seniourmentalhealth/IntegratedApproachSection";
import MentalHealthClarityCTA from "../seniourmentalhealth/MentalHealthClarityCTA";

function Seniour() {
  return (
    <>
      <Helmet>
        <title>
          Senior Mental Health Care | Dr. Ankush Garg Neuro-Ayurveda
        </title>

        <meta
          name="description"
          content="Gentle and root-cause based mental health care for seniors. Address memory decline, anxiety, sleep problems, and emotional well-being."
        />

        <meta
          name="keywords"
          content="senior mental health, memory loss elderly, anxiety in seniors, sleep issues elderly, brain fog elderly"
        />

        <link rel="canonical" href="https://drankushgarg.com/senior" />
      </Helmet>

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