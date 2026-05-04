import React from "react";

const carePoints = [
  {
    title: "Root-Cause First",
    desc: "He does not treat symptoms in isolation. Every case is mapped across brain, gut, sensory, sleep, hormones and behaviour — so improvement is structural, not superficial.",
  },
  {
    title: "Research-Backed",
    desc: "His PhD work on the gut-brain axis directly informs treatment for autism, ADHD, anxiety and depression.",
  },
  {
    title: "Measurable Progress",
    desc: "Families see month-by-month change in response, behaviour, speech, sleep and emotional regulation.",
  },
];

export default function DifferentStandardCare() {
  return (
    <section className="w-full bg-[#f7f1e8] py-6 md:py-8">
      <div className="mx-auto px-4 md:px-10">

        {/* TOP TEXT */}
        <p className="text-[#d98923] text-[13px] uppercase tracking-[0.3em] mb-3">
          Why He Is Considered No.1
        </p>

        <h2 className="font-serif text-[#002b18] text-[26px] sm:text-[30px] md:text-[36px] leading-[1.15] tracking-[-0.02em] max-w-[620px]">
          A Different Standard of Care
          <br />
          for Autism & Mental Health
        </h2>

        <p className="mt-4 max-w-[700px] text-[#2f3f4a] text-[14px] sm:text-[18px] leading-[1.6]">
        Most autism and mental health treatment stops at the symptom layer. Dr. Ankush Garg goes deeper — into the brain, the gut, the nervous system, sensory processing and behaviour together. That integrated approach is what makes him India's top autism doctor and one of the most trusted Ayurvedic neurologists in the country.
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {carePoints.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#ddd7ce] rounded-[4px] px-5 py-5 min-h-[170px] hover:shadow-sm transition"
            >
              <h3 className="font-serif text-[#002b18] text-[20px] mb-2">
                {item.title}
              </h3>

              <p className="text-[#4b5b55] text-[16px] leading-[1.5]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}