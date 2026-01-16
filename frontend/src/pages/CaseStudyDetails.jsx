import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Plus } from "lucide-react";

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
  );
}
