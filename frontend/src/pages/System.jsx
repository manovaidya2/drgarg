import React from "react";
import { Helmet } from "react-helmet-async";
import NeuroAyurvedaIntro from "../system/NeuroAyurvedaIntro";
import TreatmentGapSection from "../system/TreatmentGapSection";
import TreatmentApproachSection from "../system/TreatmentApproachSection";
import CoreDevelopmentPillars from "../system/CoreDevelopmentPillars";
import HowItConnects from "../system/HowItConnects";
import NeuroSystemFAQ from "../system/NeuroSystemFAQ";
import NeuroSystemCTA from "../system/NeuroSystemCTA";
import AboutDoctorIntro from "../about/AboutDoctorIntro";
import AboutDoctorEducation from "../about/AboutDoctorEducation";
import AboutDoctorExperience from "../about/AboutDoctorExperience";
import AboutDoctorFAQ from "../about/AboutDoctorFAQ";
import AboutDoctorCTA from "../about/AboutDoctorCTA";

function System() {
  return (
    <>
      <Helmet>
        <title>Neuro-Ayurveda Development System | Dr. Ankush Garg</title>

        <meta
          name="description"
          content="Understand the Neuro-Ayurveda Development System by Dr. Ankush Garg, a structured framework for development, behaviour, emotional wellbeing, autism, ADHD and mind-body concerns."
        />

        <meta
          name="keywords"
          content="Neuro-Ayurveda Development System, Dr Ankush Garg, Autism, ADHD, child development, behavioural concerns, emotional wellbeing, mind-body health"
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Ankush Garg" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />

        <link rel="canonical" href="https://drankushgarg.in/neuro-ayurveda-system" />

        <meta
          property="og:title"
          content="Neuro-Ayurveda Development System | Dr. Ankush Garg"
        />
        <meta
          property="og:description"
          content="A structured framework for understanding development, behaviour and emotional wellbeing."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drankushgarg.in/neuro-ayurveda-system" />
        <meta property="og:image" content="https://drankushgarg.in/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://drankushgarg.in/neuro-ayurveda-system"
        />
        <meta
          name="twitter:title"
          content="Neuro-Ayurveda Development System | Dr. Ankush Garg"
        />
        <meta
          name="twitter:description"
          content="A structured framework for understanding development, behaviour, emotional wellbeing and mind-body concerns."
        />
        <meta name="twitter:image" content="https://drankushgarg.in/og-image.jpg" />
      </Helmet>

      <div>
        <NeuroAyurvedaIntro />
        <TreatmentGapSection />
        <TreatmentApproachSection />
        <CoreDevelopmentPillars />
        <HowItConnects />
        <NeuroSystemFAQ />
        <NeuroSystemCTA />
        
        {/* Professional Background & Training Sections */}
        <AboutDoctorIntro />
        <AboutDoctorEducation />
        <AboutDoctorExperience />
        <AboutDoctorFAQ />
        <AboutDoctorCTA />
      </div>
    </>
  );
}

export default System;
