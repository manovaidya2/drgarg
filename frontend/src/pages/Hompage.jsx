import React from "react";
import { Helmet } from "react-helmet-async";

import Hero from "../Home/Hero";
import DoctorTabs from "../Home/DoctorTabs";
import HealthyMindSection from "../Home/HealthyMindSection";
import Testimonials from "./Testimonials";
import AboutSection from "../Home/AboutSection";
import StatsSection from "../Home/StatsSection";
import NeuroDevelopmentSystemSection from "../Home/NeuroDevelopmentSystemSection";
import LifeStageExpertiseSection from "../Home/LifeStageExpertiseSection";
import FamilySupportOverviewSection from "../Home/FamilySupportOverviewSection";
import CoreProblemSection from "../Home/CoreProblemSection";
import BigTruthSection from "../Home/BigTruthSection";
import NeuroAyurvedaMethod from "../Home/NeuroAyurvedaMethod";
import TrustSection from "../Home/TrustSection";
// import DomainExpertiseSection from "../Home/DomainExpertiseSection";
import ClarityCTA from "../Home/ClarityCTA";
import AutismFAQSection from "../Home/AutismFAQSection";
import BlogCarousel from "../Home/BlogCarousel";

// Import the image for preload URL
import doctorImage from "../images/2.jpg.jpeg";

function Homepage() {
  const imageUrl = typeof doctorImage === 'string' ? doctorImage : doctorImage?.src;

  return (
    <>
      {/* SEO META TAGS */}
      <Helmet>
        <title>Dr Ankush Garg, Ayurvedacharya | Founder of Manovaidya</title>

        <meta
          name="description"
          content="Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and developer of the Neuro-Ayurveda Development System. He has 7+ years of focused experience in child development and mental wellness. His PhD research explores the relationship between the gut–brain axis, behaviour and emotional wellbeing."
        />

        <meta
          name="keywords"
          content="Dr Ankush Garg, Neuro Ayurveda care, Autism, ADHD, child health, teen mental wellness, adult mental health, senior mind memory care, mind body wellbeing"
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Ankush Garg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://drankushgarg.in/" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Dr Ankush Garg, Ayurvedacharya | Founder of Manovaidya" />
        <meta
          property="og:description"
          content="Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and developer of the Neuro-Ayurveda Development System. He has 7+ years of focused experience in child development and mental wellness. His PhD research explores the relationship between the gut–brain axis, behaviour and emotional wellbeing."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drankushgarg.in/" />
        <meta
          property="og:image"
          content="https://drankushgarg.in/og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dr Ankush Garg, Ayurvedacharya | Founder of Manovaidya" />
        <meta
          name="twitter:description"
          content="Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and developer of the Neuro-Ayurveda Development System. He has 7+ years of focused experience in child development and mental wellness. His PhD research explores the relationship between the gut–brain axis, behaviour and emotional wellbeing."
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
        <NeuroDevelopmentSystemSection />
        <LifeStageExpertiseSection />
        <FamilySupportOverviewSection />
        <CoreProblemSection />
        <BigTruthSection />
        <NeuroAyurvedaMethod /> 
        <TrustSection />
        {/* <DomainExpertiseSection /> */}
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
