import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { GlobalSEO } from "../components/SEOProvider";

export default function CaseStudyList() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Breadcrumb Schema Data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://drankushgarg.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Case Studies",
        "item": "https://drankushgarg.in/case-study"
      }
    ]
  };

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Request timeout")), 10000)
        );
        
        const fetchPromise = axiosInstance.get("/case-studies");
        const res = await Promise.race([fetchPromise, timeoutPromise]);
        
        setCaseStudies(res.data);
      } catch (error) {
        console.error("Error fetching case studies", error);
        setError(error.message || "Failed to load case studies. Please try again.");
        // Fallback data for demo
        setCaseStudies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white animate-pulse">
          <div className="w-full h-44 sm:h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error Component
  const ErrorDisplay = () => (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Case Studies</h3>
      <p className="text-gray-600 mb-4">{error || "Please check your connection and try again."}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-[#8b43ba] text-white rounded-lg hover:bg-[#7a3aa3] transition"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <>
      <GlobalSEO
        seo={{
          title: "Case Studies | Dr. Ankush Garg Neuro-Ayurveda",
          description:
            "Explore documented case studies and patient journeys showing structured progress with Dr. Ankush Garg's Neuro-Ayurveda System.",
          keywords:
            "Dr Ankush Garg case studies, Neuro Ayurveda case study, autism improvement case study, mental health Ayurveda results",
          canonical: "https://drankushgarg.in/case-study",
          image: "https://drankushgarg.in/og-image.jpg",
        }}
      />

      {/* Breadcrumb Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Visible Breadcrumb Navigation */}
      <nav className="w-full bg-[#fbfaf6] pt-6 px-4 sm:px-6 lg:px-10" aria-label="Breadcrumb">
        <div className="mx-auto">
          <ol className="flex flex-wrap items-center gap-2 text-[#5d625b] text-sm">
            <li className="flex items-center">
              <a href="/" className="hover:text-[#d98923] transition-colors">
                Home
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#b9cac1]">/</span>
              <span className="text-[#002b18] font-medium">Case Studies</span>
            </li>
          </ol>
        </div>
      </nav>

      <div className="bg-white">
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden bg-[#fbfaf6]">
          <div className="absolute -top-20 -right-20 h-[220px] w-[220px] rounded-full bg-[#eadfca]/40 blur-2xl"></div>

          <div className="mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-14 md:pb-16">
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
        <div className="mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-[#8b43ba]">
            Real Patient Journeys
          </h2>

          {loading ? (
            <SkeletonLoader />
          ) : error ? (
            <ErrorDisplay />
          ) : caseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No case studies available at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((item) => (
                <Link
                  key={item._id}
                  to={`/case-study/${item.slug}`}
                  className="group border border-[#8b43ba]/20 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image || "/placeholder-image.jpg"}
                      alt={item.title}
                      className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-base md:text-lg text-[#8b43ba] group-hover:text-[#6a2e8a] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-3">
                      {item.shortDescription}
                    </p>
                    
                    <div className="mt-3 inline-flex items-center text-[#8b43ba] text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Read Case Study 
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
