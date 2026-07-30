import React from "react";
import { Helmet } from "react-helmet-async";

const defaultSEO = {
  title: "Dr. Ankush Garg | Neuro-Ayurveda Care",
  description:
    "Dr. Ankush Garg provides integrative Neuro-Ayurveda care for Autism, ADHD, mental health and mind-body wellbeing.",
  keywords:
    "Dr Ankush Garg, Neuro Ayurveda care, Autism, ADHD, mental health, mind body wellbeing, Ayurveda doctor",
  author: "Dr. Ankush Garg",
  canonical: "https://drankushgarg.in/",
  image: "https://drankushgarg.in/og-image.jpg",
  imageAlt: "Dr. Ankush Garg Neuro-Ayurveda care",
  type: "website",
  locale: "en_IN",
  robots: "index, follow",
};

export const GlobalSEO = ({ seo = {}, includeAnalytics = false }) => {
  const meta = { ...defaultSEO, ...seo };
  const structuredData = Array.isArray(meta.jsonLd)
    ? meta.jsonLd
    : meta.jsonLd
    ? [meta.jsonLd]
    : [];

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="author" content={meta.author} />
      <meta name="robots" content={meta.robots} />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <link rel="canonical" href={meta.canonical} />

      {/* Google Search Console Verification */}
      <meta
        name="google-site-verification"
        content="2h3O-SJyqaZORRSZw0GkPK0Bp1uT915HPnVRYmNu3c8"
      />

      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:secure_url" content={meta.image} />
      <meta property="og:image:alt" content={meta.imageAlt} />
      <meta property="og:site_name" content="Dr. Ankush Garg" />
      <meta property="og:locale" content={meta.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={meta.canonical} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <meta name="twitter:image:alt" content={meta.imageAlt} />

      {structuredData.map((item, index) => (
        <script type="application/ld+json" key={`seo-jsonld-${index}`}>
          {JSON.stringify(item)}
        </script>
      ))}

      {includeAnalytics && (
        <>
          {/* Google Analytics (GA4) */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-2KLEJ7N8WS"
          />
          <script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2KLEJ7N8WS');
          `}</script>
        </>
      )}
    </Helmet>
  );
};
