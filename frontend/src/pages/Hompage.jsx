import React from "react";
import { Helmet } from "react-helmet-async";

import Hero from "../Home/Hero";
import DoctorTabs from "../Home/DoctorTabs";
import HealthyMindSection from "../Home/HealthyMindSection";
import Testimonials from "./Testimonials";
import AboutSection from "../Home/AboutSection";
import StatsSection from "../Home/StatsSection";
import CoreProblemSection from "../Home/CoreProblemSection";
import BigTruthSection from "../Home/BigTruthSection";
import NeuroAyurvedaMethod from "../Home/NeuroAyurvedaMethod";
import TrustSection from "../Home/TrustSection";
import DomainExpertiseSection from "../Home/DomainExpertiseSection";
import ClarityCTA from "../Home/ClarityCTA";
import AutismFAQSection from "../Home/AutismFAQSection";
import BlogCarousel from "../Home/BlogCarousel";

// Import the image for preload URL
import doctorImage from "../images/sirimg.webp";

function Homepage() {
  const imageUrl = typeof doctorImage === 'string' ? doctorImage : doctorImage?.src;

  return (
    <>
      {/* SEO META TAGS */}
      <Helmet>
        <title>Dr. Ankush Garg | Ayurvedic Mental Wellness Expert</title>

        <meta
          name="description"
          content="Dr. Ankush Garg is an Ayurvedic mental wellness expert offering holistic treatments for stress, anxiety, depression, OCD, and overall mind health."
        />

        <meta
          name="keywords"
          content="Dr Ankush Garg, Ayurvedic mental wellness, anxiety treatment, stress management, depression therapy, holistic mind care, Ayurveda doctor"
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Ankush Garg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://drankushgarg.in/" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Dr. Ankush Garg | Ayurvedic Mental Wellness Expert" />
        <meta
          property="og:description"
          content="Personalized Ayurvedic treatments for mental wellness, stress, anxiety, and holistic mind care."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drankushgarg.in/" />
        <meta
          property="og:image"
          content="https://drankushgarg.in/og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dr. Ankush Garg | Mental Wellness" />
        <meta
          name="twitter:description"
          content="Holistic Ayurvedic mental wellness treatments by Dr. Ankush Garg."
        />
        <meta
          name="twitter:image"
          content="https://drankushgarg.in/og-image.jpg"
        />

        {/* IMAGE PRELOAD - CRITICAL FOR LCP */}
        <link 
          rel="preload" 
          as="image" 
          href={imageUrl}
          fetchPriority="high"
        />
      </Helmet>

      {/* PAGE CONTENT */}
      <div>
        <Hero />
        <StatsSection />
        <CoreProblemSection />
        <BigTruthSection />
        <NeuroAyurvedaMethod /> 
        <TrustSection />
        <DomainExpertiseSection />
        <AutismFAQSection />
        <BlogCarousel />
        <ClarityCTA />
        
        {/* <AboutSection />
        <DoctorTabs />
        <HealthyMindSection />
        <Testimonials /> */}
      </div>
    </>
  );
}

export default Homepage;