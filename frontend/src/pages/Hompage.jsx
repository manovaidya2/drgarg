import React from "react";
import Hero from "../Home/hero";
import DoctorTabs from "../Home/DoctorTabs";
import HealthyMindSection from "../Home/HealthyMindSection";
import Testimonials from "./Testimonials";
import AboutSection from "../Home/AboutSection";

function Homepage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <DoctorTabs />
      <HealthyMindSection />
      <Testimonials />
    </div>
  );
}

export default Homepage;
