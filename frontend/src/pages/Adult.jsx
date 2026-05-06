


import React from "react";
import { Helmet } from "react-helmet-async";
import AdultMentalHealthSection from "../adult/AdultMentalHealthSection";
import AdultCommonProblems from "../adult/AdultCommonProblems";
import ReframingSection from "../adult/ReframingSection";
import IntegratedApproachSection from "../adult/IntegratedApproachSection";
import MentalHealthClarityCTA from "../adult/MentalHealthClarityCTA";



function Adult() {
  return (
    <>
   <Helmet>
  <title>
    Adult Mental Health Treatment | Anxiety, Depression & OCD Care
  </title>

  <meta
    name="description"
    content="Adult mental health care by Dr. Ankush Garg using the Neuro-Ayurveda System for anxiety, depression, OCD, stress, emotional imbalance, sleep issues, and brain-gut health."
  />

  <meta
    name="keywords"
    content="adult mental health treatment, anxiety treatment India, depression treatment, OCD treatment, stress management, Neuro Ayurveda, Dr Ankush Garg, Manovaidya, brain gut health, Ayurvedic mental health doctor"
  />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="Dr. Ankush Garg" />
  <meta name="geo.region" content="IN" />
  <meta name="geo.placename" content="India" />

  <link rel="canonical" href="https://drankushgarg.com/adult" />

  <meta
    property="og:title"
    content="Adult Mental Health Treatment | Neuro-Ayurveda Care"
  />
  <meta
    property="og:description"
    content="Holistic care for anxiety, depression, OCD, stress, sleep issues, and emotional health through Dr. Ankush Garg’s Neuro-Ayurveda System."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://drankushgarg.com/adult" />
  <meta property="og:image" content="https://drankushgarg.com/og-image.jpg" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content="Adult Mental Health Treatment | Dr. Ankush Garg"
  />
  <meta
    name="twitter:description"
    content="Neuro-Ayurveda based support for adult anxiety, depression, OCD, stress, emotional imbalance, and brain-gut health."
  />
  <meta name="twitter:image" content="https://drankushgarg.com/og-image.jpg" />
</Helmet>

      <div>
     <AdultMentalHealthSection />
     <AdultCommonProblems />
     <ReframingSection  />
     <IntegratedApproachSection />
     <MentalHealthClarityCTA />
      </div>
    </>
  );
}

export default Adult;   