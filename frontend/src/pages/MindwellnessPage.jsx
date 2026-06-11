import React from "react";
import MindWellness from "../mindwellness/MindWellness";
import { GlobalSEO } from "../components/SEOProvider";


function MindwellnessPage() {
  return (
    <>
      <GlobalSEO
        seo={{
          title: "Mind Wellness Program | Dr. Ankush Garg",
          description:
            "Discover Dr. Ankush Garg's mind wellness approach for stress, anxiety, emotional balance, sleep, focus, and holistic mental health through Ayurveda.",
          keywords:
            "mind wellness, Ayurvedic mental health, stress relief, anxiety care, emotional balance, Dr Ankush Garg",
          canonical: "https://drankushgarg.in/mindwellness",
          image: "https://drankushgarg.in/og-image.jpg",
        }}
      />

      <div>
        <MindWellness />
      </div>
    </>
  );
}

export default MindwellnessPage;
