import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Plus } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function CaseStudyDetails() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const res = await axiosInstance.get(`/case-studies/${slug}`);
        setCaseStudy(res.data);
      } catch (error) {
        console.error("Error fetching case study", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-600 text-lg">
        Loading case study...
      </p>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
        <h2 className="text-2xl font-bold text-[#8b43ba] mb-3">
          Case Study Not Found
        </h2>
        <Link to="/case-study" className="underline text-[#8b43ba] font-medium">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* 🔥 SEO for Case Study */}
      <Helmet>
        <title>{caseStudy.title} | Dr. Ankush Garg</title>
        <meta
          name="description"
          content={
            caseStudy.metaDescription ||
            caseStudy.excerpt ||
            "Read detailed case study on mental wellness and Ayurvedic treatments by Dr. Ankush Garg."
          }
        />
        <meta
          name="keywords"
          content={`Dr Ankush Garg, case study, Ayurvedic mental wellness, ${caseStudy.tags?.join(", ") || "mental health"}`}
        />
        <link
          rel="canonical"
          href={`https://drankushgarg.com/case-study/${slug}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={caseStudy.title} />
        <meta
          property="og:description"
          content={
            caseStudy.excerpt ||
            "Detailed Ayurvedic mental wellness case study by Dr. Ankush Garg."
          }
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://drankushgarg.com/case-study/${slug}`}
        />
        <meta property="og:image" content={caseStudy.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={caseStudy.title} />
        <meta
          name="twitter:description"
          content={
            caseStudy.excerpt ||
            "Read this Ayurvedic mental wellness case study by Dr. Ankush Garg."
          }
        />
        <meta name="twitter:image" content={caseStudy.image} />

        {/* Article Meta */}
        <meta property="article:published_time" content={caseStudy.createdAt} />
        <meta property="article:author" content="Dr. Ankush Garg" />
      </Helmet>

      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Image */}
        <div className="w-full h-[220px] sm:h-[300px] md:h-[420px] relative">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#8b43ba] leading-snug">
                {caseStudy.title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {new Date(caseStudy.createdAt).toDateString()} · Case Study
              </p>
            </div>

            {/* CTA */}
            <Link
              to="/appointment"
              className="inline-flex items-center justify-center gap-2
                         bg-[#8b43ba] text-white px-5 py-2.5 rounded-xl
                         shadow hover:bg-[#7a38a6] transition
                         text-sm sm:text-base w-full sm:w-auto"
            >
              <Plus size={18} />
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-10 sm:mt-14 pb-16">
          <div
            className="prose prose-base sm:prose-lg max-w-none
                       prose-headings:text-gray-800
                       prose-p:text-gray-700
                       prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: caseStudy.content }}
          />
        </div>
      </div>
    </>
  );
}
