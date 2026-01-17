import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const defaultSEO = {
  title: "Dr. Ankush Garg | Ayurvedic Mental Wellness Expert",
  description:
    "Dr. Ankush Garg provides Ayurvedic mental wellness treatments for stress, anxiety, depression, and holistic mind care.",
  keywords:
    "Dr Ankush Garg, Ayurvedic mental wellness, anxiety treatment, stress management, depression therapy, holistic mind care, Ayurveda doctor",
  author: "Dr. Ankush Garg",
  canonical: "https://drankushgarg.com/",
  image: "https://drankushgarg.com/og-image.jpg",
  type: "website",
};

export const GlobalSEO = ({ seo = {} }) => {
  const meta = { ...defaultSEO, ...seo };
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="author" content={meta.author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={meta.canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content="Dr. Ankush Garg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Helmet>
  );
};
