// BlogDetails.jsx - Complete SEO-optimized blog details page with Author Schema
import React, { useEffect, useState, useRef, useCallback } from "react";
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
  Clock,
  User,
  Tag,
  Copy,
  Check,
  MessageCircle,
  Award,
  TrendingUp,
  Printer,
  Download
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
  const [copied, setCopied] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [tableOfContents, setTableOfContents] = useState([]);

  const sidebarRef = useRef(null);
  const mainContentRef = useRef(null);
  const contentRef = useRef(null);

  // Calculate reading time
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const text = content?.replace(/<[^>]*>/g, '') || '';
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return minutes;
  };

  // Generate table of contents from headings
  const generateTableOfContents = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const headings = tempDiv.querySelectorAll('h2, h3');
    const toc = Array.from(headings).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent,
      level: heading.tagName.toLowerCase(),
      top: 0
    }));
    return toc;
  };

  // Parse and clean HTML content
  const parseHtmlContent = useCallback((htmlContent) => {
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
        .replace(/<p>\s*<\/p>/gi, "")
        .replace(/<div>\s*<\/div>/gi, "")
        .replace(/(<br\s*\/?>\s*){2,}/gi, "<br/>")
        .replace(/<p>\s*(<img[^>]+>)\s*<\/p>/gi, "$1")
        .replace(/(<img[^>]+>)\s*(<p>\s*<\/p>|<br\s*\/?>|\s)*/gi, "$1")
        .replace(/<\/figure>\s*(<p>\s*<\/p>|<br\s*\/?>|\s)*/gi, "</figure>")
        .trim();

      // Add IDs to headings for table of contents
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cleanedContent;
      const headings = tempDiv.querySelectorAll('h2, h3');
      headings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
        heading.setAttribute('data-toc', 'true');
      });
      cleanedContent = tempDiv.innerHTML;

      return cleanedContent;
    } catch (error) {
      console.error("Error parsing HTML content:", error);
      return "<p>Error loading content</p>";
    }
  }, []);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/blogs/${slug}`);
        const blogData = res.data;
        
        // Calculate reading time
        const time = calculateReadingTime(blogData.content);
        setReadingTime(time);
        
        // Parse content
        const parsedHtml = parseHtmlContent(blogData.content);
        setBlog({ ...blogData, content: parsedHtml });
        
        // Generate table of contents
        const toc = generateTableOfContents(blogData.content);
        setTableOfContents(toc);

        // Fetch related posts
        if (blogData?.category) {
          try {
            const allBlogsRes = await axiosInstance.get(`/blogs`);
            const related = allBlogsRes.data
              .filter(
                (post) => post.category === blogData.category && post.slug !== slug
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
  }, [slug, parseHtmlContent]);

  // Update meta tags and document head
  useEffect(() => {
    if (blog) {
      // Update document title with SEO meta title
      document.title = `${blog.metaTitle || blog.title} | Dr. Ankush Garg`;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', blog.metaDescription || blog.shortDescription);
      }
      
      // Update meta keywords
      if (blog.metaKeywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', blog.metaKeywords);
      }
      
      // Update canonical URL
      if (blog.canonicalUrl) {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          canonicalLink = document.createElement('link');
          canonicalLink.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', blog.canonicalUrl);
      }
      
      // Update Open Graph tags
      const updateMetaTag = (attribute, name, content) => {
        if (!content) return;
        let meta = document.querySelector(`meta[${attribute}="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attribute, name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      updateMetaTag('property', 'og:title', blog.ogTitle || blog.metaTitle || blog.title);
      updateMetaTag('property', 'og:description', blog.ogDescription || blog.metaDescription || blog.shortDescription);
      updateMetaTag('property', 'og:image', blog.ogImage || blog.image);
      updateMetaTag('property', 'og:url', `https://drankushgarg.com/blog/${blog.slug}`);
      updateMetaTag('property', 'og:type', 'article');
      
      updateMetaTag('name', 'twitter:title', blog.twitterTitle || blog.metaTitle || blog.title);
      updateMetaTag('name', 'twitter:description', blog.twitterDescription || blog.metaDescription || blog.shortDescription);
      updateMetaTag('name', 'twitter:image', blog.twitterImage || blog.image);
      
      // Update robots meta
      let robotsContent = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
      if (blog.noIndex) robotsContent = `noindex, ${robotsContent}`;
      if (blog.noFollow) robotsContent = robotsContent.replace('follow', 'nofollow');
      updateMetaTag('name', 'robots', robotsContent);
    }
  }, [blog]);

  // Scroll progress tracking
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

  const toggleFaq = (index) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`;
        break;
      default:
        if (navigator.share) {
          await navigator.share({ title, url });
        } else {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRelatedPostClick = (relatedPost) => {
    navigate(`/blog/${relatedPost.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ==================== AUTHOR SCHEMA (Person Schema) ====================
  const generateAuthorSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://drankushgarg.com/about#author",
      "name": "Dr. Ankush Garg",
      "alternateName": "Dr. Ankush Garg - Ayurvedic Neurologist",
      "description": "India's leading Ayurvedic Neurologist specializing in Autism, ADHD, and Mental Health. Founder of Neuro-Ayurveda System and Manovaidya.",
      "url": "https://drankushgarg.com/about",
      "image": "https://drankushgarg.com/images/dr-ankush-garg.webp",
      "email": "info@manovaidya.com",
      "telephone": "+91-XXXXXXXXXX",
      "jobTitle": "Ayurvedic Neurologist & Founder",
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": "Manovaidya",
        "url": "https://drankushgarg.com",
        "logo": "https://drankushgarg.com/logo.png",
        "description": "India's Premier Ayurvedic Mental Health Clinic",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Gurgaon",
          "addressRegion": "Haryana",
          "addressCountry": "IN"
        }
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Ayurvedic Medical College",
        "sameAs": "https://example.com/college"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "BAMS - Bachelor of Ayurvedic Medicine and Surgery",
          "credentialCategory": "Medical Degree"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "MPH - Master of Public Health",
          "credentialCategory": "Postgraduate Degree"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "PhD - Gut-Brain Axis Research",
          "credentialCategory": "Doctoral Degree"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Ayurvedacharya",
          "credentialCategory": "Specialist Certification"
        }
      ],
      "knowsAbout": [
        "Ayurvedic Neurology",
        "Autism Treatment",
        "ADHD Management",
        "Gut-Brain Axis",
        "Teen Mental Health",
        "Anxiety Disorders",
        "Depression",
        "Neurodevelopmental Conditions",
        "Brain-Gut-Behaviour Connection"
      ],
      "sameAs": [
        "https://www.facebook.com/drankushgarg",
        "https://www.instagram.com/drankushgarg",
        "https://www.linkedin.com/in/drankushgarg",
        "https://twitter.com/drankushgarg",
        "https://www.youtube.com/c/drankushgarg"
      ],
      "award": [
        "India's No.1 Autism Doctor",
        "Best Ayurvedic Neurologist Award 2023",
        "Excellence in Neuro-Ayurveda Research"
      ],
      "knowsLanguage": ["English", "Hindi"],
      "specialty": "Ayurvedic Neurology",
      "medicalSpecialty": "Neurology",
      "availableService": [
        "Autism Consultation",
        "ADHD Treatment",
        "Anxiety Management",
        "Teen Mental Health Counseling",
        "Neuro-Ayurveda Therapy"
      ],
      "honorificPrefix": "Dr.",
      "gender": "Male",
      "nationality": "Indian"
    };
  };

  // Generate combined Author + Profile Page Schema
  const generateProfilePageSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://drankushgarg.com/about#profilepage",
      "name": "Dr. Ankush Garg - Ayurvedic Neurologist Profile",
      "description": "Professional profile of Dr. Ankush Garg, India's leading Ayurvedic Neurologist",
      "author": {
        "@id": "https://drankushgarg.com/about#author"
      },
      "mainEntity": {
        "@id": "https://drankushgarg.com/about#author"
      }
    };
  };

  // Generate FAQ Schema
  const generateFAQSchema = () => {
    if (!blog?.faq || blog.faq.length === 0) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": blog.faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  };

  // Generate BlogPosting Schema with Author Reference
  const generateBlogPostingSchema = () => {
    if (!blog) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `https://drankushgarg.com/blog/${slug}#article`,
      "headline": blog.metaTitle || blog.title,
      "description": blog.metaDescription || blog.shortDescription,
      "image": blog.ogImage || blog.image ? [blog.ogImage || blog.image] : [],
      "datePublished": blog.publishedDate || blog.date,
      "dateModified": blog.modifiedDate || blog.updatedAt || blog.date,
      "author": {
        "@type": "Person",
        "name": "Dr. Ankush Garg",
        "@id": "https://drankushgarg.com/about#author",
        "url": "https://drankushgarg.com/about",
        "sameAs": [
          "https://twitter.com/drankushgarg",
          "https://linkedin.com/in/drankushgarg",
          "https://facebook.com/drankushgarg",
          "https://instagram.com/drankushgarg"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Dr. Ankush Garg - Manovaidya",
        "url": "https://drankushgarg.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://drankushgarg.com/logo.png"
        },
        "sameAs": [
          "https://www.facebook.com/drankushgarg",
          "https://www.instagram.com/drankushgarg",
          "https://www.youtube.com/c/drankushgarg"
        ]
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": blog.canonicalUrl || `https://drankushgarg.com/blog/${slug}`
      },
      "keywords": blog.metaKeywords,
      "articleSection": blog.category,
      "inLanguage": "en-US",
      "wordCount": blog.content?.length || 0,
      "isAccessibleForFree": true,
      "readingTime": `${readingTime} minutes`,
      "about": {
        "@type": "Thing",
        "name": blog.category || "Ayurvedic Mental Health"
      }
    };
  };

  // Generate Breadcrumb Schema
  const generateBreadcrumbSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `https://drankushgarg.com/blog/${slug}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://drankushgarg.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://drankushgarg.com/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": blog?.title || "Article",
          "item": `https://drankushgarg.com/blog/${slug}`
        }
      ]
    };
  };

  // Generate WebSite Schema
  const generateWebSiteSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://drankushgarg.com#website",
      "name": "Dr. Ankush Garg - Ayurvedic Neurologist",
      "description": "Expert Ayurvedic Neurologist specializing in Autism, ADHD, and Mental Health using Neuro-Ayurveda System",
      "url": "https://drankushgarg.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://drankushgarg.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@id": "https://drankushgarg.com/about#author"
      }
    };
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Article | Dr. Ankush Garg</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading expert insights...</p>
          </div>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Helmet>
          <title>Article Not Found | Dr. Ankush Garg</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Explore Other Articles
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{blog.metaTitle || blog.title} | Dr. Ankush Garg</title>
        <meta name="description" content={blog.metaDescription || blog.shortDescription} />
        {blog.metaKeywords && <meta name="keywords" content={blog.metaKeywords} />}
        <meta name="author" content="Dr. Ankush Garg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={blog.canonicalUrl || `https://drankushgarg.com/blog/${slug}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://drankushgarg.com/blog/${slug}`} />
        <meta property="og:title" content={blog.ogTitle || blog.metaTitle || blog.title} />
        <meta property="og:description" content={blog.ogDescription || blog.metaDescription || blog.shortDescription} />
        <meta property="og:image" content={blog.ogImage || blog.image} />
        <meta property="og:site_name" content="Dr. Ankush Garg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://drankushgarg.com/blog/${slug}`} />
        <meta name="twitter:title" content={blog.twitterTitle || blog.metaTitle || blog.title} />
        <meta name="twitter:description" content={blog.twitterDescription || blog.metaDescription || blog.shortDescription} />
        <meta name="twitter:image" content={blog.twitterImage || blog.image} />
        
        {/* Article Specific Meta Tags */}
        <meta property="article:published_time" content={blog.publishedDate || blog.date} />
        <meta property="article:modified_time" content={blog.modifiedDate || blog.updatedAt || blog.date} />
        <meta property="article:author" content="https://drankushgarg.com/about" />
        <meta property="article:author:name" content="Dr. Ankush Garg" />
        {blog.category && <meta property="article:section" content={blog.category} />}
        
        {/* Robots Meta */}
        <meta name="robots" content={blog.noIndex || blog.noFollow ? 
          `${blog.noIndex ? 'noindex' : 'index'}, ${blog.noFollow ? 'nofollow' : 'follow'}, max-snippet:-1, max-image-preview:large, max-video-preview:-1` : 
          'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
        
        {/* Schema.org Structured Data */}
        {/* Author Schema (Person) */}
        <script type="application/ld+json">
          {JSON.stringify(generateAuthorSchema())}
        </script>
        
        {/* Profile Page Schema */}
        <script type="application/ld+json">
          {JSON.stringify(generateProfilePageSchema())}
        </script>
        
        {/* Website Schema */}
        <script type="application/ld+json">
          {JSON.stringify(generateWebSiteSchema())}
        </script>
        
        {/* Blog Posting Schema */}
        <script type="application/ld+json">
          {JSON.stringify(generateBlogPostingSchema())}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema())}
        </script>
        
        {/* FAQ Schema */}
        {blog.faq && blog.faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(generateFAQSchema())}
          </script>
        )}
      </Helmet>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors"
            >
              <Printer size={18} />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[280px] sm:h-[380px] md:h-[500px] overflow-hidden bg-gray-800">
        <div className="absolute inset-0">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.metaTitle || blog.title}
              className="w-full h-full object-cover opacity-60"
              loading="eager"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        <div className="relative h-full flex items-end max-w-7xl mx-auto px-4 pb-8 sm:pb-12">
          <div className="max-w-3xl">
            {/* Category and Meta Info */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              {blog.category && (
                <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {blog.category}
                </span>
              )}
              <span className="text-white/80 text-xs flex items-center gap-1">
                <Eye size={14} /> {blog.views || 0} views
              </span>
              <span className="text-white/80 text-xs flex items-center gap-1">
                <Heart size={14} /> {blog.likes || 0} likes
              </span>
              <span className="text-white/80 text-xs flex items-center gap-1">
                <Clock size={14} /> {readingTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
              {blog.title}
            </h1>

            {/* Short Description */}
            <p className="text-white/80 mt-2 line-clamp-3 leading-relaxed text-sm sm:text-base">
              {blog.shortDescription}
            </p>

            {/* Author and Date */}
            <div className="flex items-center gap-4 mt-4 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <User size={14} />
                <span>Dr. Ankush Garg</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Left Sidebar - Table of Contents */}
          {tableOfContents.length > 0 && (
            <div className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-24 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen size={18} />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToHeading(item.id)}
                      className={`block text-left text-sm ${
                        item.level === 'h2' ? 'pl-0 font-medium' : 'pl-4 text-gray-600'
                      } hover:text-green-700 transition-colors w-full`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main Article Content */}
          <div className="lg:w-2/3 w-full min-w-0" ref={mainContentRef}>
            {/* Author Bio */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-5 shadow-sm border border-green-100 mb-5 sm:mb-6" itemScope itemType="https://schema.org/Person">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                  A
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">About the Author</h3>
                  <p className="text-sm font-medium text-green-700" itemProp="name">Dr. Ankush Garg</p>
                  <meta itemProp="jobTitle" content="Ayurvedic Neurologist" />
                  <meta itemProp="url" content="https://drankushgarg.com/about" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3" itemProp="description">
                Dr. Ankush Garg is India's No.1 autism doctor, leading Ayurvedic neurologist, 
                and founder of Manovaidya. With over 9+ years of experience, he has helped 
                thousands of patients achieve better mental health through his Neuro-Ayurveda System.
              </p>
              <div className="flex gap-2 pt-2 border-t border-green-100">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Award size={12} /> Expert in Neuro-Ayurveda
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp size={12} /> 7+ Years Experience
                </span>
              </div>
            </div>

            {/* Article Body */}
            <div 
              ref={contentRef}
              className="bg-white rounded-xl p-2 sm:p-6 md:p-8 shadow-sm border border-gray-100 overflow-hidden"
            >
              <div
                className="blog-content prose max-w-none w-full overflow-hidden break-words"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* FAQ Section */}
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
                          <ChevronUp size={20} className="text-green-700 flex-shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {openFaqs.includes(index) && (
                        <div className="px-4 sm:px-5 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engagement Section */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      liked 
                        ? 'bg-red-50 text-red-600 border border-red-200' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                    <span>{blog.likes || 0} Likes</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Share:</span>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="p-2 bg-[#1877f2] text-white rounded-lg hover:bg-[#0c63d4] transition-colors"
                  >
                    <Facebook size={16} />
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="p-2 bg-[#1da1f2] text-white rounded-lg hover:bg-[#0d8bec] transition-colors"
                  >
                    <Twitter size={16} />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="p-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#006396] transition-colors"
                  >
                    <Linkedin size={16} />
                  </button>
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="p-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20b859] transition-colors"
                  >
                    <MessageCircle size={16} />
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section Placeholder */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageCircle size={18} />
                Discussion
              </h3>
              <p className="text-gray-500 text-sm">
                Have questions about this article? Contact Dr. Ankush Garg directly at 
                <a href="mailto:info@manovaidya.com" className="text-green-700 ml-1">info@manovaidya.com</a>
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3 w-full">
            <div ref={sidebarRef} className="lg:sticky lg:top-24 space-y-6">
              {/* Author Card (Enhanced) */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md mx-auto mb-3">
                    A
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Dr. Ankush Garg</h3>
                  <p className="text-sm text-green-700 mb-2">Ayurvedic Neurologist</p>
                  <p className="text-xs text-gray-500 mb-3">BAMS, MPH, PhD · Ayurvedacharya</p>
                  <div className="flex justify-center gap-2 mb-3">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">7+ Years Exp</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">10,000+ Patients</span>
                  </div>
                  <Link
                    to="/about"
                    className="inline-block w-full bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
                  >
                    Know More About Author
                  </Link>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
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
                                alt={relatedPost.metaTitle || relatedPost.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
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
                                <span className="text-[10px]">{relatedPost.views || 0}</span>
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

              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 shadow-sm border border-green-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Subscribe to Newsletter
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Get the latest updates about mental wellness directly in your inbox.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
                  >
                    Subscribe Now
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

              {/* Download PDF Option */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Download size={18} />
                  Save for Later
                </h3>
                <button
                  onClick={handlePrint}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Printer size={16} />
                  Print / Save as PDF
                </button>
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
          scroll-margin-top: 100px;
        }

        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.875rem;
          color: #111827;
          scroll-margin-top: 100px;
        }

        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #111827;
          scroll-margin-top: 100px;
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

        @media print {
          .sticky,
          .fixed,
          button,
          .lg\\:sticky {
            display: none !important;
          }
          
          .blog-content {
            font-size: 12pt;
            line-height: 1.5;
          }
          
          .blog-content img {
            page-break-inside: avoid;
          }
          
          .blog-content h1,
          .blog-content h2,
          .blog-content h3 {
            page-break-after: avoid;
          }
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