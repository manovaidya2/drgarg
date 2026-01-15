import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import img from "../images/banner-aayurveda.jpg";

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
    <div>
      {/* Hero Section */}
      <section
        className="relative h-48 sm:h-56 md:h-60 w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-[#1d5a57]/80"></div>

        <div className="relative text-center text-white px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Dr. Ankush Garg's Case Studies
          </h1>
          <p className="uppercase tracking-widest text-xs sm:text-sm">
            Ayurvedacharya & Senior Ayurvedic Consultant
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-[#8b43ba]">
          Case Studies
        </h1>

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
                  <h2 className="font-semibold text-base md:text-lg text-[#8b43ba]">
                    {item.title}
                  </h2>
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
