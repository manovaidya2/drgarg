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
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-[#8b43ba] mb-2">
          Case Study Not Found
        </h2>
        <Link to="/case-study" className="underline text-[#8b43ba]">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Image */}
      <div className="w-full h-[400px] relative">
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-10 mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#8b43ba]">
          {caseStudy.title}
        </h1>
        <p className="text-gray-600 mt-1">
          {new Date(caseStudy.createdAt).toDateString()} | Case Study
        </p>

        <div className="flex justify-end -mt-10">
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 bg-[#8b43ba] text-white px-4 py-2 rounded-xl shadow hover:bg-[#7a38a6] transition text-sm"
          >
            <Plus size={16} /> Book Consultation
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-10 mt-12 prose prose-lg max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: caseStudy.content }}
        />
      </div>
    </div>
  );
}
