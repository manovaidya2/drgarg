import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = blogs
      .map((blog) => blog.category)
      .filter(Boolean);

    return ["All", ...new Set(uniqueCategories)];
  }, [blogs]);

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  if (loading) {
    return <p className="text-center py-20">Loading blogs...</p>;
  }

  return (
    <div className="bg-[#f6f4ef]">
      {/* HERO */}
      <section className="w-full bg-[#f6f4ef]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#cfd6d2] bg-white px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d8a63b]" />
            <span className="text-[#0b3b2e] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.25em]">
              INSIGHTS & EDUCATION
            </span>
          </div>

          <h1 className="mt-6 font-serif text-[#0b3b2e] text-[34px] sm:text-[46px] md:text-[56px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] max-w-[900px]">
            Real Answers on Autism,
            <br />
            ADHD & Mental Health
          </h1>

          <p className="mt-6 max-w-[780px] text-[#3d4f4a] text-[16px] sm:text-[18px] md:text-[20px] leading-[1.7]">
            Plain-language, parent-friendly, research-backed articles from Dr.
            Ankush Garg — India's No.1 autism doctor, best Ayurvedic
            neurologist, and founder of Manovaidya.
          </p>
        </div>
      </section>

      {/* WHY THIS BLOG EXISTS */}
      <section className="w-full bg-[#f6f4ef] px-4 sm:px-6 lg:px-8 py-6">
        <div className="mx-auto max-w-[1400px] rounded-[6px] border border-[#efd59d] bg-[#fbf7ef] px-5 sm:px-6 lg:px-7 py-6">
          <p className="text-[#c37a12] text-[11px] sm:text-[12px] font-serif uppercase tracking-[0.35em]">
            WHY THIS BLOG EXISTS
          </p>

          <p className="mt-4 max-w-[1000px] text-[#263633] text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.6]">
            Most parents and patients leave a doctor's clinic with a diagnosis
            and no real understanding. This blog exists to fix that. Every
            article here is written or personally guided by{" "}
            <strong>Dr. Ankush Garg</strong> — widely recognized as India's{" "}
            <strong>No.1 autism doctor</strong>, the country's leading{" "}
            <strong>Ayurvedic neurologist</strong>, and the developer of the{" "}
            <strong>Neuro-Ayurveda System</strong> at{" "}
            <strong>Manovaidya</strong>. No jargon. No fear-mongering. Just
            clarity.
          </p>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#f6f4ef]">
        <div className="max-w-[1400px] mx-auto">
          {/* DYNAMIC FILTER */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-[5px] border text-[14px] transition ${
                  activeCategory === category
                    ? "bg-[#003f26] border-[#003f26] text-white"
                    : "bg-white border-[#ddd8cd] text-[#263633] hover:bg-[#fbf7ef]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* BLOG GRID */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-[#fbfaf7] border border-[#e6e0d6] rounded-[10px] px-6 py-6 min-h-[430px] flex flex-col justify-between transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <span className="text-[11px] tracking-[0.35em] text-[#c37a12] uppercase font-serif">
                        {blog.category || "Uncategorized"}
                      </span>

                      <div className="mt-4 h-[1px] w-[120px] bg-[#e5c98d]" />
                    </div>

                    <span className="text-[12px] text-[#0b3b2e] whitespace-nowrap">
                      {Math.max(
                        1,
                        Math.ceil((blog.content?.length || 600) / 700)
                      )}{" "}
                      min
                    </span>
                  </div>

                  <h2 className="font-serif text-[#061f18] text-[19px] sm:text-[20px] leading-[1.45] tracking-[-0.01em]">
                    {blog.title}
                  </h2>

                  <p className="mt-5 text-[#40514d] text-[15px] leading-[1.7]">
                    {blog.shortDescription}
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-3 text-[#003f26] text-[15px] font-medium hover:gap-4 transition-all"
                  >
                    Read Article
                    <span className="text-[22px] leading-none">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <p className="text-center py-12 text-[#40514d]">
              No blogs found in this category.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}