import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axiosInstance from "../api/axiosInstance";
import { useSsrData } from "../ssrData";

const SITE_URL = "https://drankushgarg.in";
const PAGE_SIZE = 9;

const stripHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getReadTime = (content = "") =>
  Math.max(1, Math.ceil(stripHtml(content).split(/\s+/).filter(Boolean).length / 180));

const isPublicBlog = (blog) =>
  blog &&
  blog.title &&
  blog.slug &&
  blog.published !== false &&
  !["draft", "unpublished"].includes(String(blog.status || "").toLowerCase());

const getCategoryFromSearch = (search) => {
  const params = new URLSearchParams(search);
  return params.get("category") || "All";
};

const getPageFromSearch = (search) => {
  const page = Number.parseInt(new URLSearchParams(search).get("page"), 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
};

const getBlogListingUrl = (category = "All", page = 1) => {
  const params = new URLSearchParams();
  if (category && category !== "All") params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
};

const getCanonicalUrl = (category, page) =>
  `${SITE_URL}${getBlogListingUrl(category, page)}`;

const getMetaDetails = (category, page) => {
  const pageSuffix = page > 1 ? ` - Page ${page}` : "";

  if (category && category !== "All") {
    return {
      title: `${category} Articles${pageSuffix} | Dr. Ankush Garg`,
      description: `Read ${category} articles from Dr. Ankush Garg with educational guidance on child development, Neuro-Ayurveda and mental wellness.`,
    };
  }

  return {
    title: `Real Answers on Autism, ADHD & Mental Health${pageSuffix} | Dr. Ankush Garg`,
    description:
      "Plain-language, parent-friendly articles on Autism, ADHD, child development and mental wellness from Dr. Ankush Garg.",
  };
};

export default function BlogPage() {
  const location = useLocation();
  const ssrData = useSsrData();
  const activeCategory = getCategoryFromSearch(location.search);
  const currentPage = getPageFromSearch(location.search);

  const initialBlogs = Array.isArray(ssrData.blogs)
    ? ssrData.blogs.filter(isPublicBlog)
    : [];
  const initialCategories = Array.isArray(ssrData.categories)
    ? ssrData.categories.filter(Boolean)
    : [];

  const [blogs, setBlogs] = useState(initialBlogs);
  const [categories, setCategories] = useState(initialCategories);
  const [pagination, setPagination] = useState(
    ssrData.pagination || {
      page: currentPage,
      limit: PAGE_SIZE,
      total: initialBlogs.length,
      totalPages: Math.max(1, Math.ceil(initialBlogs.length / PAGE_SIZE)),
    }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (typeof window === "undefined") return;

      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.set("limit", String(PAGE_SIZE));
        params.set("page", String(currentPage));
        if (activeCategory !== "All") params.set("category", activeCategory);

        const res = await axiosInstance.get(`/blogs?${params.toString()}`);
        const responseBlogs = Array.isArray(res.data?.blogs) ? res.data.blogs : res.data;
        setBlogs((Array.isArray(responseBlogs) ? responseBlogs : []).filter(isPublicBlog));
        setCategories((previousCategories) =>
          (Array.isArray(res.data?.categories)
            ? res.data.categories
            : previousCategories
          )
            .filter(Boolean)
            .sort()
        );
        if (res.data?.pagination) {
          setPagination(res.data.pagination);
        }
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeCategory, currentPage]);

  const categoryOptions = useMemo(() => {
    const blogCategories = blogs.map((blog) => blog.category).filter(Boolean);
    return ["All", ...new Set([...categories, ...blogCategories].sort())];
  }, [blogs, categories]);

  const metaDetails = getMetaDetails(activeCategory, currentPage);
  const canonicalUrl = getCanonicalUrl(activeCategory, currentPage);
  const totalPages = Math.max(1, pagination.totalPages || 1);
  const hasArticles = blogs.length > 0;

  const listStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline:
      activeCategory === "All"
        ? "Autism, ADHD & Mental Health Blog"
        : `${activeCategory} Articles`,
    description: metaDetails.description,
    url: canonicalUrl,
    numberOfItems: blogs.length,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogs.map((blog, index) => ({
        "@type": "ListItem",
        position: (currentPage - 1) * PAGE_SIZE + index + 1,
        url: `${SITE_URL}/blog/${blog.slug}`,
        name: blog.title,
      })),
    },
    author: {
      "@type": "Person",
      name: "Dr. Ankush Garg",
    },
    publisher: {
      "@type": "Organization",
      name: "Dr. Ankush Garg",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: activeCategory === "All" ? "Blog" : `${activeCategory} Articles`,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{metaDetails.title}</title>
        <meta name="description" content={metaDetails.description} />
        <meta
          name="keywords"
          content="autism, ADHD, mental health, Ayurveda, Dr. Ankush Garg, neuro-ayurveda, child psychology, mental wellness"
        />
        <link rel="canonical" href={canonicalUrl} />
        {currentPage > 1 && (
          <link
            rel="prev"
            href={getCanonicalUrl(activeCategory, currentPage - 1)}
          />
        )}
        {currentPage < totalPages && (
          <link
            rel="next"
            href={getCanonicalUrl(activeCategory, currentPage + 1)}
          />
        )}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={metaDetails.title} />
        <meta property="og:description" content={metaDetails.description} />
        <meta property="og:image" content={`${SITE_URL}/blog-og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={metaDetails.title} />
        <meta name="twitter:description" content={metaDetails.description} />
        <meta name="twitter:image" content={`${SITE_URL}/blog-twitter-image.jpg`} />
        <meta name="author" content="Dr. Ankush Garg" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <script type="application/ld+json">
          {JSON.stringify(listStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <nav
        className="w-full bg-[#f6f4ef] pt-6 px-4 sm:px-6 lg:px-10"
        aria-label="Breadcrumb"
      >
        <ol className="flex flex-wrap items-center gap-2 text-[#5d625b] text-sm">
          <li>
            <a href="/" className="hover:text-[#d98923] transition-colors">
              Home
            </a>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#b9cac1]">/</span>
            <a href="/blog" className="hover:text-[#d98923] transition-colors">
              Blog
            </a>
          </li>
          {activeCategory !== "All" && (
            <li className="flex items-center gap-2">
              <span className="text-[#b9cac1]">/</span>
              <span className="text-[#002b18] font-medium">{activeCategory}</span>
            </li>
          )}
        </ol>
      </nav>

      <div className="bg-[#f6f4ef]">
        <section className="w-full bg-[#f6f4ef]">
          <div className="mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfd6d2] bg-white px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d8a63b]" />
              <span className="text-[#0b3b2e] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.25em]">
                INSIGHTS & EDUCATION
              </span>
            </div>

            <h1 className="mt-6 font-serif text-[#0b3b2e] text-[34px] sm:text-[46px] md:text-[56px] lg:text-[56px] leading-[1.05] max-w-[900px]">
              {activeCategory === "All"
                ? "Real Answers on Autism, ADHD & Mental Health"
                : `${activeCategory} Articles`}
            </h1>

            <p className="mt-6 max-w-[780px] text-[#3d4f4a] text-[16px] sm:text-[18px] md:text-[20px] leading-[1.7]">
              Plain-language, parent-friendly articles from Dr. Ankush Garg on
              child development, Neuro-Ayurveda and mental wellness.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#f6f4ef] px-4 sm:px-6 lg:px-10 py-6">
          <div className="mx-auto rounded-[6px] border border-[#efd59d] bg-[#fbf7ef] px-5 sm:px-6 lg:px-7 py-6">
            <p className="text-[#c37a12] text-[11px] sm:text-[12px] font-serif uppercase tracking-[0.35em]">
              WHY THIS BLOG EXISTS
            </p>

            <p className="mt-4 max-w-[1000px] text-[#263633] text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.6]">
              This blog shares educational guidance for families and individuals
              looking for clearer information around development, behaviour,
              emotional wellbeing and the Neuro-Ayurveda framework used at
              Manovaidya.
            </p>
          </div>
        </section>

        <section className="py-8 px-4 sm:px-6 lg:px-10 bg-[#f6f4ef]">
          <div className="mx-auto">
            <nav className="flex flex-wrap gap-3 mb-8" aria-label="Blog categories">
              {categoryOptions.map((category) => (
                <Link
                  key={category}
                  to={getBlogListingUrl(category)}
                  className={`px-4 py-2 rounded-[5px] border text-[14px] transition ${
                    activeCategory === category
                      ? "bg-[#003f26] border-[#003f26] text-white"
                      : "bg-white border-[#ddd8cd] text-[#263633] hover:bg-[#fbf7ef]"
                  }`}
                  aria-current={activeCategory === category ? "page" : undefined}
                >
                  {category}
                </Link>
              ))}
            </nav>

            {loading && (
              <p className="mb-6 text-[#40514d]" role="status">
                Updating articles...
              </p>
            )}

            {hasArticles ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <article
                    key={blog._id || blog.slug}
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
                          {getReadTime(blog.content || blog.shortDescription)} min read
                        </span>
                      </div>

                      <h2
                        className="font-serif text-[#061f18] text-[19px] sm:text-[20px] leading-[1.45] group-hover:text-[#003f26] transition-colors"
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

                      <meta
                        itemProp="datePublished"
                        content={blog.publishedDate || blog.date || blog.createdAt}
                      />
                      <meta itemProp="author" content="Dr. Ankush Garg" />
                      {blog.image && <meta itemProp="image" content={blog.image} />}
                    </div>

                    <div className="mt-8">
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-3 text-[#003f26] text-[15px] font-medium hover:gap-4 transition-all"
                        aria-label={`Read article: ${blog.title}`}
                      >
                        Read Article
                        <span className="text-[22px] leading-none">-&gt;</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#40514d] mb-4">
                  No published articles are available yet.
                </p>
                {activeCategory !== "All" && (
                  <Link
                    to="/blog"
                    className="text-[#003f26] underline hover:text-[#c37a12] transition-colors"
                  >
                    View all articles
                  </Link>
                )}
              </div>
            )}

            {hasArticles && totalPages > 1 && (
              <nav className="mt-12 flex justify-center" aria-label="Blog pagination">
                <div className="flex flex-wrap justify-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      className="px-4 py-2 border border-[#ddd8cd] rounded-md bg-white hover:bg-[#fbf7ef] transition-colors"
                      to={getBlogListingUrl(activeCategory, currentPage - 1)}
                      rel="prev"
                    >
                      Previous
                    </Link>
                  )}

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                      <Link
                        key={page}
                        className={`px-4 py-2 border rounded-md transition-colors ${
                          page === currentPage
                            ? "bg-[#003f26] border-[#003f26] text-white"
                            : "bg-white border-[#ddd8cd] text-[#263633] hover:bg-[#fbf7ef]"
                        }`}
                        to={getBlogListingUrl(activeCategory, page)}
                        aria-current={page === currentPage ? "page" : undefined}
                      >
                        {page}
                      </Link>
                    )
                  )}

                  {currentPage < totalPages && (
                    <Link
                      className="px-4 py-2 border border-[#ddd8cd] rounded-md bg-white hover:bg-[#fbf7ef] transition-colors"
                      to={getBlogListingUrl(activeCategory, currentPage + 1)}
                      rel="next"
                    >
                      Next
                    </Link>
                  )}
                </div>
              </nav>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
