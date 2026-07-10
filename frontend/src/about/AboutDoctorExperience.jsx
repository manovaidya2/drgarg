import React from "react";

const focusAreas = [
  "Autism Spectrum Disorder",
  "ADHD",
  "Child Development Concerns",
  "Behavioural Challenges",
  "Emotional Regulation",
  "Teen Mental Wellness",
  "Adult Stress & Anxiety",
  "Mind-Body Health Concerns"
];

const certExamples = [
  "Ayurvedacharya qualification",
  "Additional child development training",
  "Mental health-related training",
  "Ayurveda clinical training",
  "Workshop certificates",
  "Professional learning certificates"
];

const trainingAreas = [
  "Child Development",
  "Autism & ADHD Awareness",
  "Behavioural Concerns",
  "Parent Guidance",
  "Mental Wellness",
  "Ayurveda-Based Holistic Health",
  "Mind-Body Health",
  "Lifestyle & Wellness Education"
];

const devAreas = [
  "Clinical observation",
  "Family guidance work",
  "Developmental case understanding",
  "Parent education",
  "Awareness programs",
  "Study of brain, gut, behaviour and emotional wellbeing connections"
];

const communityAreas = [
  "Child Development Awareness",
  "Autism & ADHD Awareness",
  "Parent Guidance",
  "Behavioural Health Education",
  "Teen Mental Wellness",
  "Emotional Wellbeing",
  "Mind-Body Health Awareness"
];

const pubAreas = [
  "Educational articles",
  "Parent awareness resources",
  "Website guides",
  "Child development content",
  "Mental wellness education",
  "Neuro-Ayurveda awareness material"
];

const whyMatters = [
  "Relevant education",
  "Clinical exposure",
  "Continuous learning",
  "Structured approach",
  "Family-focused guidance",
  "Commitment to awareness and education"
];

export default function AboutDoctorExperience() {
  return (
    <section className="w-full bg-white py-10 md:py-12">
      <div className="mx-auto px-4 md:px-10">

        {/* Clinical Experience */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-[26px] leading-[1.2] tracking-[-0.03em] text-[#002b18] sm:text-[30px] md:text-[32px]">
            Clinical Experience
          </h2>
          <div className="max-w-4xl space-y-4 text-[15px] leading-[1.7] text-[#374151] md:text-[16px]">
            <p>
              Over the years, Dr. Ankush Garg has worked with children, teenagers, adults and families seeking guidance for developmental, behavioural, emotional and wellbeing-related concerns.
            </p>
            <p className="font-semibold text-[#002b18]">His clinical focus includes:</p>
            <ul className="list-disc pl-6 space-y-1">
              {focusAreas.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p>
              His work focuses on structured assessment, personalized guidance and long-term understanding rather than only symptom-based explanations.
            </p>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-[26px] leading-[1.2] tracking-[-0.03em] text-[#002b18] sm:text-[30px] md:text-[32px]">
            Certifications
          </h2>
          <div className="max-w-4xl space-y-4 text-[15px] leading-[1.7] text-[#374151] md:text-[16px]">
            <p>
              This section should include only verified certifications and formal professional credentials.
            </p>
            <p className="font-semibold text-[#002b18]">Examples to add here:</p>
            <ul className="list-disc pl-6 space-y-1">
              {certExamples.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="italic text-gray-500">
              If a certificate is not verified, it should not be added.
            </p>
          </div>
        </div>

        {/* Trainings & Workshops */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-[26px] leading-[1.2] tracking-[-0.03em] text-[#002b18] sm:text-[30px] md:text-[32px]">
            Trainings & Workshops
          </h2>
          <div className="max-w-4xl space-y-4 text-[15px] leading-[1.7] text-[#374151] md:text-[16px]">
            <p>
              Dr. Ankush Garg continues to participate in professional learning and educational development related to Ayurveda, child development, behavioural health and mental wellness.
            </p>
            <p className="font-semibold text-[#002b18]">Relevant training areas may include:</p>
            <ul className="list-disc pl-6 space-y-1">
              {trainingAreas.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p>
              This ongoing learning helps strengthen his structured approach toward developmental and emotional wellbeing.
            </p>
          </div>
        </div>

        {/* Professional Development */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-[26px] leading-[1.2] tracking-[-0.03em] text-[#002b18] sm:text-[30px] md:text-[32px]">
            Professional Development
          </h2>
          <div className="max-w-4xl space-y-4 text-[15px] leading-[1.7] text-[#374151] md:text-[16px]">
            <p>
              Professional development is an ongoing part of Dr. Ankush Garg's work.
            </p>
            <p className="font-semibold text-[#002b18]">His learning and practice continue to evolve through:</p>
            <ul className="list-disc pl-6 space-y-1">
              {devAreas.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p>
              This continuous development contributed to the creation of the Neuro-Ayurveda Development System&trade;.
            </p>
          </div>
        </div>

        {/* Community Education Work */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-[26px] leading-[1.2] tracking-[-0.03em] text-[#002b18] sm:text-[30px] md:text-[32px]">
            Community Education Work
          </h2>
          <div className="max-w-4xl space-y-4 text-[15px] leading-[1.7] text-[#374151] md:text-[16px]">
            <p>
              Beyond consultations, Dr. Ankush Garg is involved in education and awareness initiatives for families and individuals.
            </p>
            <p className="font-semibold text-[#002b18]">His community education work focuses on:</p>
            <ul className="list-disc pl-6 space-y-1">
              {communityAreas.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p>
              The goal is to help families move from confusion to clarity through reliable and structured education.
            </p>
          </div>
        </div>

        {/* Media Features */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-[26px] leading-[1.2] tracking-[-0.03em] text-[#002b18] sm:text-[30px] md:text-[32px]">
            Media Features
          </h2>
          <div className="max-w-4xl space-y-4 text-[15px] leading-[1.7] text-[#374151] md:text-[16px]">
            <p>
              Media features, interviews, podcasts, guest appearances, educational talks or public awareness features can be listed here.
            </p>
            <p className="italic text-gray-500">
              If currently not available, this section can say: Media features and public educational appearances will be updated here as they become available.
            </p>
          </div>
        </div>

        {/* Publications & Educational Resources */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-[26px] leading-[1.2] tracking-[-0.03em] text-[#002b18] sm:text-[30px] md:text-[32px]">
            Publications & Educational Resources
          </h2>
          <div className="max-w-4xl space-y-4 text-[15px] leading-[1.7] text-[#374151] md:text-[16px]">
            <p>
              Dr. Ankush Garg's educational work includes creating awareness-based content around child development, mental wellness, behavioural concerns and mind-body wellbeing.
            </p>
            <p className="font-semibold text-[#002b18]">This may include:</p>
            <ul className="list-disc pl-6 space-y-1">
              {pubAreas.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="italic text-gray-500">
              Formal research publications should only be listed if they are actually published and verifiable.
            </p>
          </div>
        </div>

        {/* Why This Background Matters */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-[26px] leading-[1.2] tracking-[-0.03em] text-[#002b18] sm:text-[30px] md:text-[32px]">
            Why This Background Matters
          </h2>
          <div className="max-w-4xl space-y-4 text-[15px] leading-[1.7] text-[#374151] md:text-[16px]">
            <p>
              Families often seek guidance when they are confused, worried or unsure about the right direction.
            </p>
            <p className="font-semibold text-[#002b18]">A strong professional background helps build confidence because it shows:</p>
            <ul className="list-disc pl-6 space-y-1">
              {whyMatters.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p>
              This background supports Dr. Ankush Garg's work in child development, behavioural health, emotional wellbeing and long-term wellness guidance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
