import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function CaseStudyList() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await axiosInstance.get("/case-studies");
        setCaseStudies(res.data);
      } catch (error) {
        console.error("Error fetching case studies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  return (
    <div className="bg-white">
      {/* HERO SECTION - NEW DESIGN */}
{/* HERO SECTION - COMPACT */}
<section className="relative w-full overflow-hidden bg-[#fbfaf6]">
  <div className="absolute -top-20 -right-20 h-[220px] w-[220px] rounded-full bg-[#eadfca]/40 blur-2xl"></div>

  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-14 md:pb-16">
    <div className="max-w-[900px]">

      {/* Tag */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#c8d5cf] bg-white/70 px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#d8a63b]"></span>
        <span className="text-[#003f26] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.25em]">
          Case Studies
        </span>
      </div>

      {/* Heading */}
      <h1 className="mt-5 font-serif text-[#003f26] text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.02em]">
        Real Progress, Documented Carefully
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-[700px] text-[#36454f] text-[14px] sm:text-[16px] md:text-[18px] leading-[1.6]">
        Every case is different. These examples illustrate how the Neuro-Ayurveda
        System has supported real measurable improvement across all four care domains.
      </p>

    </div>
  </div>
</section>
      {/* Case Studies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-[#8b43ba]">
          Case Studies
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((item) => (
              <Link
                key={item._id}
                to={`/case-study/${item.slug}`}
                className="border border-[#8b43ba] rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-44 sm:h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-base md:text-lg text-[#8b43ba]">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}