import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AutismFAQSection() {
  const faqs = [
    {
      question: "Can autism be cured?",
      answer:
        "Autism is not considered completely curable, but autism improvement is possible with the right autism treatment in India. When treatment is limited only to therapies, results are often slower. Better outcomes are usually seen when a brain development and gut–brain connection–based Ayurveda autism treatment approach is followed.",
    },
    {
      question: "Is improvement possible in autism?",
      answer:
        "Yes, autism improvement is possible, but the timeline is different for every child. It depends on the treatment approach and the child’s internal condition. Structured autism treatment in India, especially approaches that work on both brain and gut, have shown better improvement outcomes.",
    },
    {
      question: "What is the best treatment for autism?",
      answer:
        "There is no single treatment that works for every child. The best autism treatment in India is usually a personalized approach that combines therapies with Ayurveda autism treatment focused on brain development, digestion, and the gut–brain connection. Early intervention often leads to better autism improvement.",
    },
    {
      question: "At what age should autism treatment start?",
      answer:
        "Autism treatment should begin as early as possible after signs are noticed. Early autism treatment in India can help improve communication, social interaction, learning abilities, and overall development. Early support increases the chances of significant autism improvement.",
    },
    {
      question: "Can Ayurveda help children with autism?",
      answer:
        "Ayurveda autism treatment aims to support brain function, nervous system balance, digestion, and overall child development. While autism is a lifelong condition, many parents report noticeable autism improvement in areas such as speech, focus, behavior, and social interaction when Ayurveda is combined with appropriate therapies.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-[#e8f5e9] px-4 py-2 text-sm font-semibold text-[#2e7d32]">
              Frequently Asked Questions
            </span>

            <h2 className="mt-5 text-3xl font-semibold text-gray-900 md:text-4xl">
              Autism Treatment FAQs
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
              Find answers to the most common questions about autism, autism
              improvement, and Ayurveda autism treatment approaches.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <h3 className="pr-4 text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>

                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[#2e7d32]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#2e7d32]" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-gray-100 px-6 py-5">
                    <p className="leading-7 text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}