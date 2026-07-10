import React from "react";
import { Helmet } from "react-helmet-async";
import AboutDoctorIntro from "../about/AboutDoctorIntro";
import AboutDoctorEducation from "../about/AboutDoctorEducation";
import AboutDoctorExperience from "../about/AboutDoctorExperience";
import AboutDoctorFAQ from "../about/AboutDoctorFAQ";
import AboutDoctorCTA from "../about/AboutDoctorCTA";

export default function AboutDoctorPage() {
  return (
    <>
      <Helmet>
        <title>Professional Background & Training | Dr. Ankush Garg</title>
        <meta
          name="description"
          content="An overview of Dr. Ankush Garg's professional background, clinical learning, training, educational work and ongoing development."
        />
      </Helmet>

      <div>
        <AboutDoctorIntro />
        <AboutDoctorEducation />
        <AboutDoctorExperience />
        <AboutDoctorFAQ />
        <AboutDoctorCTA />
      </div>
    </>
  );
}
