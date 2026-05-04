import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axiosInstance from "../api/axiosInstance";
import {
  Calendar,
  ArrowLeft,
  Heart,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  BookOpen,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function BlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaqs, setOpenFaqs] = useState([]);

  const sidebarRef = useRef(null);
  const mainContentRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const parseHtmlContent = (htmlContent) => {
    if (!htmlContent) return "";

    try {
      let cleanedContent = htmlContent
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")

        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/on\w+="[^"]*"/g, "")
        .replace(/on\w+='[^']*'/g, "")
        .replace(/javascript:/gi, "")

        // ✅ mobile image bottom gap fix
        .replace(/<p>\s*<\/p>/gi, "")
        .replace(/<div>\s*<\/div>/gi, "")
        .replace(/(<br\s*\/?>\s*){2,}/gi, "<br/>")
        .replace(/<p>\s*(<img[^>]+>)\s*<\/p>/gi, "$1")
        .replace(/(<img[^>]+>)\s*(<p>\s*<\/p>|<br\s*\/?>|\s)*/gi, "$1")
        .replace(/<\/figure>\s*(<p>\s*<\/p>|<br\s*\/?>|\s)*/gi, "</figure>")
        .trim();

      return cleanedContent;
    } catch (error) {
      console.error("Error parsing HTML content:", error);
      return "<p>Error loading content</p>";
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(`/blogs/${slug}`);
        const parsedHtml = parseHtmlContent(res.data.content);

        setBlog({ ...res.data, content: parsedHtml });

        if (res.data?.category) {
          try {
            const allBlogsRes = await axiosInstance.get(`/blogs`);
            const related = allBlogsRes.data
              .filter(
                (post) => post.category === res.data.category && post.slug !== slug
              )
              .slice(0, 4);

            setRelatedPosts(related);
          } catch (error) {
            console.error("Error fetching related posts:", error);
          }
        }
      } catch (error) {
        console.error("Blog not found", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress || 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = async () => {
    if (!blog) return;

    try {
      if (!liked) {
        await axiosInstance.post(`/blogs/${blog._id}/like`);
        setBlog({ ...blog, likes: (blog.likes || 0) + 1 });
      } else {
        await axiosInstance.delete(`/blogs/${blog._id}/like`);
        setBlog({ ...blog, likes: (blog.likes || 0) - 1 });
      }

      setLiked(!liked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = blog.title;

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;

      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`;
        break;

      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`;
        break;

      default:
        if (navigator.share) {
          await navigator.share({ title, url });
        } else {
          navigator.clipboard.writeText(url);
          alert("Link copied to clipboard!");
        }
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const handleRelatedPostClick = (relatedPost) => {
    navigate(`/blog/${relatedPost.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading amazing content...
          </p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="text-6xl mb-4">🔍</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Blog Not Found
          </h2>

          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist or has been moved.
          </p>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Explore Other Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Dr. Ankush Garg</title>

        <meta
          name="description"
          content={
            blog.metaDescription ||
            blog.shortDescription ||
            "Read expert insights on mental wellness, Ayurveda, and holistic mind care by Dr. Ankush Garg."
          }
        />

        <meta
          name="keywords"
          content={`Dr Ankush Garg, mental wellness, Ayurveda, ${
            blog.category || "mental health blog"
          }`}
        />

        <link rel="canonical" href={`https://drankushgarg.com/blog/${slug}`} />

        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={
            blog.shortDescription ||
            "Expert Ayurvedic insights on mental wellness by Dr. Ankush Garg."
          }
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://drankushgarg.com/blog/${slug}`} />
        <meta property="og:image" content={blog.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta
          name="twitter:description"
          content={
            blog.shortDescription ||
            "Read this mental wellness article by Dr. Ankush Garg."
          }
        />
        <meta name="twitter:image" content={blog.image} />

        <meta property="article:published_time" content={blog.date} />
        <meta property="article:author" content="Dr. Ankush Garg" />
      </Helmet>

      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-green-700 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      <div className="relative h-[280px] sm:h-[380px] md:h-[500px] overflow-hidden bg-gray-500">
        <div className="absolute inset-0">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover opacity-60"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        </div>

        <div className="relative h-full flex items-end max-w-7xl mx-auto px-4 pb-8 sm:pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {blog.category || "Mental Wellness"}
              </span>

              <span className="text-white/80 text-xs flex items-center gap-1">
                <Eye size={14} /> {blog.views || "0"} views
              </span>

              <span className="text-white/80 text-xs flex items-center gap-1">
                <Heart size={14} /> {blog.likes || "0"} likes
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
              {blog.title}
            </h1>

            <p className="text-white/80 mt-2 line-clamp-3 leading-relaxed text-sm sm:text-base">
              {blog.shortDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 md:py-12">
        <div
          className="flex flex-col lg:flex-row gap-8 relative"
          ref={mainContentRef}
        >
          <div className="lg:w-2/3 w-full min-w-0">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-5 shadow-sm border border-green-100 mb-5 sm:mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                  {blog.author?.charAt(0) || "A"}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    About the Author
                  </h3>

                  <p className="text-sm font-medium text-green-700">
                    {blog.author || "Dr. Ankush Garg"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                Expert in {blog.category || "mental wellness"} with 9+ years of
                experience helping individuals achieve better mental health and
                holistic well-being.
              </p>

              <div className="flex gap-2 pt-2 border-t border-green-100">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar size={12} /> Joined 2020
                </span>

                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <BookOpen size={12} /> Expert Guide
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-2 sm:p-6 md:p-8 shadow-sm border border-gray-100 overflow-hidden">
              <div
                className="blog-content prose max-w-none w-full overflow-hidden break-words"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {blog.faq && blog.faq.length > 0 && (
              <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 mt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <HelpCircle className="text-green-700" size={24} />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Frequently Asked Questions
                    </h2>

                    <p className="text-gray-600 text-sm mt-1">
                      Find answers to common questions about this topic
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {blog.faq.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-200 transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-4 sm:px-5 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-800 pr-4">
                          {faq.question}
                        </span>

                        {openFaqs.includes(index) ? (
                          <ChevronUp
                            size={20}
                            className="text-green-700 flex-shrink-0"
                          />
                        ) : (
                          <ChevronDown
                            size={20}
                            className="text-gray-400 flex-shrink-0"
                          />
                        )}
                      </button>

                      {openFaqs.includes(index) && (
                        <div className="px-4 sm:px-5 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mt-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Share2 size={16} />
                Share this article
              </h3>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex-1 bg-[#1877f2] text-white p-2.5 rounded-lg hover:bg-[#0c63d4] transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Facebook size={16} />
                  Facebook
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  className="flex-1 bg-[#1da1f2] text-white p-2.5 rounded-lg hover:bg-[#0d8bec] transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Twitter size={16} />
                  Twitter
                </button>

                <button
                  onClick={() => handleShare("linkedin")}
                  className="flex-1 bg-[#0077b5] text-white p-2.5 rounded-lg hover:bg-[#006396] transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 w-full">
            <div
              ref={sidebarRef}
              className="lg:sticky lg:top-24"
              style={{
                maxHeight: "calc(100vh - 8rem)",
                overflowY: "auto",
              }}
            >
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen size={18} />
                    Related Articles
                  </h3>

                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <div
                        key={relatedPost._id}
                        onClick={() => handleRelatedPostClick(relatedPost)}
                        className="group cursor-pointer bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex gap-3">
                          {relatedPost.image && (
                            <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                              <img
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          )}

                          <div className="flex-1 p-2 pr-3">
                            {relatedPost.category && (
                              <span className="text-[10px] font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full inline-block mb-1">
                                {relatedPost.category}
                              </span>
                            )}

                            <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-green-700 transition-colors">
                              {relatedPost.title}
                            </h4>

                            <div className="flex items-center justify-between mt-1">
                              <span className="text-[10px] text-gray-500">
                                {new Date(relatedPost.date).toLocaleDateString()}
                              </span>

                              <div className="flex items-center gap-1 text-gray-400">
                                <Eye size={10} />
                                <span className="text-[10px]">
                                  {relatedPost.views || 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <Link
                      to="/blog"
                      className="text-sm text-green-700 hover:text-green-800 font-medium inline-flex items-center gap-1"
                    >
                      View All Articles
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 shadow-sm border border-green-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Subscribe to Newsletter
                </h3>

                <p className="text-sm text-gray-600 mb-3">
                  Get the latest updates about mental wellness directly in your
                  inbox.
                </p>

                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-w-0"
                  />

                  <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blog-content {
          font-size: 1.125rem;
          line-height: 1.75;
          color: #374151;
        }

        .blog-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.875rem;
          color: #111827;
        }

        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }

        .blog-content p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }

        .blog-content img {
          display: block;
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          object-fit: contain;
          border-radius: 0.75rem;
          margin: 1rem auto !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .blog-content ul,
        .blog-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
        }

        .blog-content a {
          color: #15803d;
          text-decoration: underline;
        }

        .blog-content a:hover {
          color: #166534;
        }

        .blog-content blockquote {
          border-left: 4px solid #15803d;
          background-color: #f3f4f6;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          border-radius: 0.5rem;
        }

        .blog-content code {
          background-color: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.375rem;
          font-family: monospace;
          font-size: 0.875rem;
        }

        .blog-content pre {
          background-color: #1f2937;
          color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .blog-content th,
        .blog-content td {
          border: 1px solid #e5e7eb;
          padding: 0.75rem;
          text-align: left;
        }

        .blog-content th {
          background-color: #f3f4f6;
          font-weight: 600;
        }

        .blog-content figure,
        .blog-content iframe,
        .blog-content video,
        .blog-content table {
          max-width: 100% !important;
        }

        .blog-content figure {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }

        .blog-content iframe,
        .blog-content video {
          width: 100% !important;
        }

        .blog-content * {
          max-width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
            line-height: 1.6;
          }

          .blog-content h1 {
            font-size: 1.75rem;
          }

          .blog-content h2 {
            font-size: 1.5rem;
          }

          .blog-content h3 {
            font-size: 1.25rem;
          }

          .blog-content img {
            margin: 6px auto !important;
          }

          .blog-content figure {
            margin: 6px 0 !important;
            padding: 0 !important;
          }

          .blog-content p {
            margin-bottom: 10px !important;
          }

          .blog-content p:empty,
          .blog-content div:empty {
            display: none !important;
          }

          .blog-content br + br {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}