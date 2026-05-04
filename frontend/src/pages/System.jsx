

import React from "react";
import { Helmet } from "react-helmet-async";
import NeuroAyurvedaIntro from "../system/NeuroAyurvedaIntro";
import TreatmentGapSection from "../system/TreatmentGapSection";
import TreatmentApproachSection from "../system/TreatmentApproachSection";
import CoreDevelopmentPillars from "../system/CoreDevelopmentPillars";
import HowItConnects from "../system/HowItConnects";
import NeuroSystemCTA from "../system/NeuroSystemCTA";


function System() {
  return (
    <>
      <Helmet>
        <title>
          Dr. Ankush Garg | India’s No.1 Autism Doctor & Neuro-Ayurveda Specialist
        </title>

        <meta
          name="description"
          content="Dr. Ankush Garg is India’s leading Autism Doctor and Ayurvedic Neurologist. Founder of Manovaidya and developer of the Neuro-Ayurveda System, specializing in autism, ADHD, anxiety, OCD, and holistic brain health."
        />

        <meta
          name="keywords"
          content="Dr Ankush Garg, Autism Doctor India, ADHD treatment, Ayurvedic Neurologist, Neuro Ayurveda, Manovaidya, gut brain axis doctor, anxiety depression OCD treatment, autism specialist India"
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Ankush Garg" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />

        <link rel="canonical" href="https://drankushgarg.com/" />

        <meta
          property="og:title"
          content="Dr. Ankush Garg | India’s No.1 Autism Doctor"
        />
        <meta
          property="og:description"
          content="Specialized Neuro-Ayurveda treatment for Autism, ADHD, Anxiety & Brain Health. Developed by Dr. Ankush Garg."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drankushgarg.com/" />
        <meta
          property="og:image"
          content="https://drankushgarg.com/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Dr. Ankush Garg | Autism & Brain Health Specialist"
        />
        <meta
          name="twitter:description"
          content="India’s leading Autism Doctor using Neuro-Ayurveda system for brain, behaviour & gut health."
        />
        <meta
          name="twitter:image"
          content="https://drankushgarg.com/og-image.jpg"
        />
      </Helmet>

      <div>
<NeuroAyurvedaIntro />
<TreatmentGapSection />
<TreatmentApproachSection />
<CoreDevelopmentPillars     />
<HowItConnects />
<NeuroSystemCTA />
      </div>
    </>
  );
}

export default System;   