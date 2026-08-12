import React from "react";
import { Link } from "react-router-dom";
import doctorImg from "../images/White coat (3).webp";

const focusAreas = [
  {
    title: "Child Development",
    desc: "Supporting children with developmental, behavioural, communication and learning-related concerns.",
    link: "/autism-adhd",
  },
  {
    title: "Behavioural Concerns",
    desc: "Helping families better understand emotional regulation, behaviour patterns and developmental challenges.",
    link: "/autism-adhd",
  },
  {
    title: "Teen Mental Wellness",
    desc: "Supporting emotional wellbeing, confidence, academic stress and healthy development during adolescence.",
    link: "/teenage-mental-health",
  },
  {
    title: "Adult Mental Health",
    desc: "Helping individuals address stress, anxiety, emotional wellbeing and lifestyle-related concerns.",
    link: "/adult-mental-health",
  },
  {
    title: "Mind & Body Health",
    desc: "Understanding the relationship between emotional wellbeing, lifestyle and overall health.",
    link: "/mindwellness",
  },
];

const journeyPoints = [
  "Developmental concerns may involve communication, sensory processing and behavioural factors.",
  "Emotional challenges may involve stress, sleep, lifestyle habits and coping patterns.",
  "Behavioural concerns may be influenced by emotional regulation, learning difficulties and environmental factors.",
];

const systemAreas = [
  {
    title: "Brain Nourishment System",
    desc: "Supporting attention, learning, cognitive development and emotional wellbeing.",
  },
  {
    title: "Gut Response System",
    desc: "Understanding the connection between digestive health, nutrition and overall wellbeing.",
  },
  {
    title: "Neural Network System",
    desc: "Supporting developmental growth, learning pathways and adaptation.",
  },
  {
    title: "Sensory Integration System",
    desc: "Helping individuals better process and respond to sensory information.",
  },
  {
    title: "Behaviour Guidance System",
    desc: "Supporting communication, emotional regulation and behavioural development.",
  },
];

const reasons = [
  "A structured understanding of their concerns",
  "Personalized assessment and guidance",
  "A long-term developmental perspective",
  "Parent education and support",
  "A holistic understanding of wellbeing",
  "Clear direction and practical next steps",
];

const faqs = [
  {
    q: "Who is Dr Ankush Garg?",
    a: "Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and developer of the Neuro-Ayurveda Development System. He has 7+ years of focused experience in child development and mental wellness. His PhD research explores the relationship between the gut–brain axis, behaviour and emotional wellbeing.",
  },
  {
    q: "What areas does Dr Ankush Garg work in?",
    a: "His areas of focus include child development, behavioural concerns, teen mental wellness, adult mental health and mind-body health.",
  },
  {
    q: "What is the Neuro-Ayurveda Development System?",
    a: "The Neuro-Ayurveda Development System is a structured framework developed by Dr Ankush Garg to understand the interconnected factors influencing development, behaviour and emotional wellbeing.",
  },
  {
    q: "Does Dr Ankush Garg work only with children?",
    a: "No. While child development is a major focus area, he also works with teenagers, adults, women and seniors seeking guidance for emotional wellbeing and mind-body health concerns.",
  },
  {
    q: "How can families get started?",
    a: "Families can begin with a structured assessment and consultation to better understand their concerns and identify appropriate next steps.",
  },
];

export default function AboutSection() {
  return (
    <section className="bg-white py-10 sm:py-14 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-start gap-10 md:gap-14">
        {/* IMAGE SIDE */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          {/* Purple background shape */}
          <div
            className="
            absolute 
            w-72 h-40
            sm:w-80 sm:h-44
            md:w-[400px] md:h-52
            bg-purple-600 
            rounded-t-full 
            left-1/2 -translate-x-1/2 
            bottom-0 
            z-10
          "
          ></div>

          {/* Yellow dots */}
          <div
            className="
            absolute 
            left-2 sm:-left-6 md:-left-16 
            top-4 sm:-top-4 md:-top-6 
            grid grid-cols-3 grid-rows-5 gap-2 
            z-20
          "
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            ))}
          </div>

          {/* Doctor image */}
          <img
            src={doctorImg}
            alt="Dr Ankush Garg Autism ADHD Child Development Specialist India"
            className="
              relative z-30 
              w-56 sm:w-64 md:w-80 lg:w-96 
              object-contain
            "
          />
        </div>

        {/* TEXT SIDE */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-700 mb-3">
            About
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            About Dr Ankush Garg
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4">
            Autism, ADHD, Child Development & Mental Wellness Specialist In India
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
            Supporting children, teenagers, adults and families through structured
            assessment, personalized guidance and the Neuro-Ayurveda Development
            System.
          </p>

          <div className="space-y-7">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Who Is Dr Ankush Garg?
              </h3>
              <div className="space-y-4 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                <p>
                  Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya
                  and developer of the Neuro-Ayurveda Development System. He has
                  7+ years of focused experience in child development and mental
                  wellness. His PhD research explores the relationship
                  between the gut–brain axis, behaviour and emotional wellbeing.
                </p>
                <p>
                  His work focuses on helping children, teenagers, adults and
                  families better understand the factors influencing development,
                  behaviour, emotional wellbeing and long-term health.
                </p>
                <p>
                  Over the years, he has worked with individuals and families
                  seeking guidance for concerns related to Autism Spectrum
                  Disorder (ASD), ADHD, developmental delays, behavioural
                  challenges, emotional wellbeing, stress-related concerns and
                  mind-body health issues.
                </p>
                <p>
                  His approach is based on the understanding that development,
                  behaviour and wellbeing are influenced by multiple
                  interconnected factors rather than a single isolated symptom.
                  This philosophy eventually led to the development of the
                  Neuro-Ayurveda Development System, which forms the foundation
                  of his current work.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-purple-50 p-5 text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                  To help children, teenagers, adults and families better
                  understand the factors influencing development, behaviour,
                  emotional wellbeing and overall health through structured
                  assessment, education and personalized guidance.
                </p>
              </div>
              <div className="rounded-xl bg-yellow-50 p-5 text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Our Vision</h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                  To increase awareness about the relationship between brain
                  health, behaviour, emotional wellbeing, lifestyle and
                  development while making holistic health concepts easier to
                  understand and apply in everyday life.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Professional Journey
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                Throughout his professional journey, Dr Ankush Garg observed that
                many developmental, behavioural and emotional concerns often
                involve multiple interconnected influences.
              </p>
              <ul className="space-y-3 text-left">
                {journeyPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm sm:text-base leading-relaxed text-gray-600">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple-600"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mt-4">
                These observations reinforced the importance of looking beyond
                symptoms and understanding the broader factors that may influence
                an individual's overall wellbeing. This perspective continues to
                guide his work with children, teenagers, adults and families
                today.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Areas Of Focus
              </h3>
              <div className="grid gap-3">
                {focusAreas.map((area) => (
                  <Link
                    key={area.title}
                    to={area.link}
                    className="rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:border-purple-200 hover:bg-purple-50"
                  >
                    <h4 className="text-base font-bold text-gray-900 mb-1">{area.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-600">{area.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                The Neuro-Ayurveda Development System<sup>TM</sup>
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                While working with families and individuals, Dr Ankush Garg
                recognised that developmental and emotional concerns are rarely
                influenced by a single factor. These observations contributed to
                the development of the Neuro-Ayurveda Development System, a
                structured framework designed to understand the interconnected
                factors that may influence development, behaviour and wellbeing.
              </p>
              <div className="grid gap-3">
                {systemAreas.map((area) => (
                  <div key={area.title} className="rounded-xl bg-gray-50 p-4 text-left">
                    <h4 className="text-base font-bold text-gray-900 mb-1">{area.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-600">{area.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/neuro-ayurveda-system"
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
              >
                Learn More About The Neuro-Ayurveda Development System
              </Link>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Education, Training & Professional Development
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Dr Ankush Garg's academic foundation is rooted in Ayurvedic
                education and clinical training. Alongside formal education, he
                continues to participate in professional learning, workshops,
                training programs and educational initiatives focused on child
                development, behavioural health, emotional wellbeing and holistic
                health approaches.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Community Education & Awareness
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Beyond consultations, Dr Ankush Garg actively contributes to
                educational initiatives designed to increase awareness about
                child development, behavioural concerns, emotional wellbeing and
                mental health. Through educational content, awareness programs,
                workshops and parent guidance initiatives, the goal is to make
                reliable information more accessible to families seeking greater
                clarity and understanding.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Why Families Choose Dr Ankush Garg
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {reasons.map((reason) => (
                  <div key={reason} className="rounded-lg bg-purple-50 px-4 py-3 text-sm font-semibold text-gray-700">
                    {reason}
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mt-4">
                The focus is not only on identifying concerns but also on helping
                families better understand development, behaviour and long-term
                growth.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3 text-left">
                {faqs.map((faq) => (
                  <div key={faq.q} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <h4 className="text-base font-bold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gray-900 p-6 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Looking For Structured Guidance & Assessment?
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-gray-200 mb-5">
                Whether you are seeking support for developmental concerns,
                behavioural challenges, emotional wellbeing or long-term
                wellness, the first step is understanding the factors influencing
                growth and wellbeing.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-yellow-300"
                >
                  Book An Assessment With Dr Ankush Garg
                </Link>
                <Link
                  to="/autism-adhd"
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Explore Areas Of Expertise
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
