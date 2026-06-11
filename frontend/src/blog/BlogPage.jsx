// BlogPage.jsx - Updated version with Breadcrumb
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axiosInstance from "../api/axiosInstance";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [siteSettings, setSiteSettings] = useState({
    title: "Dr. Ankush Garg - Autism & Mental Health Expert",
    description: "Real Answers on Autism, ADHD & Mental Health - Plain-language, parent-friendly, research-backed articles from Dr. Ankush Garg"
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blogs");
        // Ensure we have all SEO data
        const blogsWithSEO = res.data.map(blog => ({
          ...blog,
          metaTitle: blog.metaTitle || blog.title,
          metaDescription: blog.metaDescription || blog.shortDescription
        }));
        setBlogs(blogsWithSEO);
        
        // Update page title with count if needed
        if (blogsWithSEO.length > 0) {
          document.title = `${blogsWithSEO.length} Articles on Autism, ADHD & Mental Health | Dr. Ankush Garg`;
        }
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

  // Generate structured data for blog listing
  const generateListStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "headline": "Autism, ADHD & Mental Health Blog",
      "description": siteSettings.description,
      "url": "https://drankushgarg.in/blog",
      "numberOfItems": filteredBlogs.length,
      "author": {
        "@type": "Person",
        "name": "Dr. Ankush Garg"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Dr. Ankush Garg",
        "logo": {
          "@type": "ImageObject",
          "url": "https://drankushgarg.in/logo.png"
        }
      }
    };
  };

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
        "name": "Blog",
        "item": "https://drankushgarg.in/blog"
      }
    ]
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Articles | Dr. Ankush Garg</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="flex justify-center items-center min-h-screen bg-[#f6f4ef]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#003f26] border-t-transparent"></div>
            <p className="mt-4 text-[#3d4f4a] font-medium">Loading expert insights...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{siteSettings.title}</title>
        <meta name="description" content={siteSettings.description} />
        <meta name="keywords" content="autism, ADHD, mental health, Ayurveda, Dr. Ankush Garg, neuro-ayurveda, child psychology, mental wellness, anxiety treatment, depression help" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drankushgarg.in/blog" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drankushgarg.in/blog" />
        <meta property="og:title" content={siteSettings.title} />
        <meta property="og:description" content={siteSettings.description} />
        <meta property="og:image" content="https://drankushgarg.in/blog-og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://drankushgarg.in/blog" />
        <meta name="twitter:title" content={siteSettings.title} />
        <meta name="twitter:description" content={siteSettings.description} />
        <meta name="twitter:image" content="https://drankushgarg.in/blog-twitter-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="author" content="Dr. Ankush Garg" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateListStructuredData())}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Visible Breadcrumb Navigation */}
      <nav className="w-full bg-[#f6f4ef] pt-6 px-4 sm:px-6 lg:px-10" aria-label="Breadcrumb">
        <div className="mx-auto">
          <ol className="flex flex-wrap items-center gap-2 text-[#5d625b] text-sm">
            <li className="flex items-center">
              <a href="/" className="hover:text-[#d98923] transition-colors">
                Home
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#b9cac1]">/</span>
              <span className="text-[#002b18] font-medium">Blog</span>
            </li>
          </ol>
        </div>
      </nav>

      <div className="bg-[#f6f4ef]">
        {/* HERO */}
        <section className="w-full bg-[#f6f4ef]">
          <div className="mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-10">
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
        <section className="w-full bg-[#f6f4ef] px-4 sm:px-6 lg:px-10 py-6">
          <div className="mx-auto rounded-[6px] border border-[#efd59d] bg-[#fbf7ef] px-5 sm:px-6 lg:px-7 py-6">
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
        <section className="py-8 px-4 sm:px-6 lg:px-10 bg-[#f6f4ef]">
          <div className="mx-auto">
            {/* Category Filter with SEO-friendly structure */}
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
                  aria-label={`Filter by ${category}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* BLOG GRID */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-[#fbfaf7] border border-[#e6e0d6] rounded-[10px] px-6 py-6 min-h-[430px] flex flex-col justify-between transition hover:shadow-md group"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <span 
                          className="text-[11px] tracking-[0.35em] text-[#c37a12] uppercase font-serif"
                          itemProp="articleSection"
                        >
                          {blog.category || "Uncategorized"}
                        </span>

                        <div className="mt-4 h-[1px] w-[120px] bg-[#e5c98d]" />
                      </div>

                      <span className="text-[12px] text-[#0b3b2e] whitespace-nowrap">
                        {Math.max(1, Math.ceil((blog.content?.length || 600) / 700))} min read
                      </span>
                    </div>

                    <h2 
                      className="font-serif text-[#061f18] text-[19px] sm:text-[20px] leading-[1.45] tracking-[-0.01em] group-hover:text-[#003f26] transition-colors"
                      itemProp="headline"
                    >
                      <Link to={`/blog/${blog.slug}`} itemProp="url">
                        {blog.title}
                      </Link>
                    </h2>

                    <p 
                      className="mt-5 text-[#40514d] text-[15px] leading-[1.7]"
                      itemProp="description"
                    >
                      {blog.metaDescription || blog.shortDescription}
                    </p>

                    {/* Hidden SEO metadata */}
                    <meta itemProp="datePublished" content={blog.date} />
                    <meta itemProp="author" content="Dr. Ankush Garg" />
                    {blog.image && (
                      <meta itemProp="image" content={blog.image} />
                    )}
                  </div>

                  <div className="mt-8">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-3 text-[#003f26] text-[15px] font-medium hover:gap-4 transition-all"
                      aria-label={`Read article: ${blog.title}`}
                    >
                      Read Article
                      <span className="text-[22px] leading-none">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#40514d] mb-4">No blogs found in this category.</p>
                <button
                  onClick={() => setActiveCategory("All")}
                  className="text-[#003f26] underline hover:text-[#c37a12] transition-colors"
                >
                  View all articles
                </button>
              </div>
            )}

            {/* Pagination SEO */}
            {filteredBlogs.length > 0 && (
              <nav className="mt-12 flex justify-center" aria-label="Blog pagination">
                <div className="flex gap-2">
                  <button className="px-4 py-2 border rounded-md hover:bg-white transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-[#003f26] text-white rounded-md">
                    1
                  </button>
                  <button className="px-4 py-2 border rounded-md hover:bg-white transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 border rounded-md hover:bg-white transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 border rounded-md hover:bg-white transition-colors">
                    Next
                  </button>
                </div>
              </nav>
            )}
          </div>
        </section>
      </div>
    </>
  );
}