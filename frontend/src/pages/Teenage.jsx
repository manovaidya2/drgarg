import React from "react";
import { Helmet } from "react-helmet-async";

import AdultCommonProblems from "../teenage/AdultCommonProblems";
import ReframingSection from "../teenage/ReframingSection";
import IntegratedApproachSection from "../teenage/IntegratedApproachSection";
import MentalHealthClarityCTA from "../teenage/MentalHealthClarityCTA";
import TeenageMentalHealthHero from "../teenage/TeenageMentalHealthHero";

function Adult() {
  return (
    <>
      <Helmet>
        <title>
          Teenage Mental Health | Dr. Ankush Garg Neuro-Ayurveda Approach
        </title>

        <meta
          name="description"
          content="Holistic teenage mental health support using Neuro-Ayurveda. Address anxiety, behaviour issues, screen addiction, mood swings and emotional struggles in teens."
        />

        <meta
          name="keywords"
          content="teenage mental health, teen anxiety, teen depression, behaviour issues teens, screen addiction teens, neuro ayurveda teens, Dr Ankush Garg"
        />

        <link rel="canonical" href="https://drankushgarg.com/teenage" />
      </Helmet>

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