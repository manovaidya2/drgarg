


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
    Adult Mental Health | Dr. Ankush Garg
  </title>

  <meta
    name="description"
    content="Adult mental health is connected to the brain, gut, nervous system, hormones, sleep, lifestyle and emotional patterns. Begin with a complete, structured approach."
  />

  <meta
    name="keywords"
    content="adult mental health, anxiety, depression, OCD, stress, emotional imbalance, sleep, Neuro Ayurveda, Dr Ankush Garg, Manovaidya, brain gut health"
  />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="Dr. Ankush Garg" />
  <meta name="geo.region" content="IN" />
  <meta name="geo.placename" content="India" />

  <link rel="canonical" href="https://drankushgarg.in/adult-mental-health" />

  <meta
    property="og:title"
    content="Adult Mental Health | Neuro-Ayurveda Care"
  />
  <meta
    property="og:description"
    content="A complete, structured approach to adult mental health through brain, gut, nervous system, hormones, sleep, lifestyle and emotional patterns."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://drankushgarg.in/adult-mental-health" />
  <meta property="og:image" content="https://drankushgarg.in/og-image.jpg" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://drankushgarg.in/adult-mental-health" />
  <meta
    name="twitter:title"
    content="Adult Mental Health | Dr. Ankush Garg"
  />
  <meta
    name="twitter:description"
    content="A structured approach to adult mental health through brain, gut, nervous system, hormones, sleep, lifestyle and emotional patterns."
  />
  <meta name="twitter:image" content="https://drankushgarg.in/og-image.jpg" />
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
