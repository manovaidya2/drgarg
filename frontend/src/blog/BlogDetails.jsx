// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import axiosInstance from "../api/axiosInstance";

// export default function BlogDetails() {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await axiosInstance.get(`/blogs/${slug}`);
//         setBlog(res.data);
//       } catch (error) {
//         console.error("Blog not found", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [slug]);

//   if (loading) {
//     return (
//       <p className="text-center py-20 text-gray-600 text-lg">
//         Loading blog...
//       </p>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="text-center py-16">
//         <p className="text-lg text-gray-600 mb-3">Blog not found</p>
//         <Link to="/blog" className="text-green-700 underline font-medium">
//           Back to blogs
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* 🔥 BLOG SEO */}
//       <Helmet>
//         <title>{blog.title} | Dr. Ankush Garg</title>

//         <meta
//           name="description"
//           content={
//             blog.metaDescription ||
//             blog.excerpt ||
//             "Read expert insights on mental wellness, Ayurveda, and holistic mind care by Dr. Ankush Garg."
//           }
//         />

//         <meta
//           name="keywords"
//           content={`Dr Ankush Garg, mental wellness, Ayurveda, ${blog.tags?.join(", ") || "mental health blog"}`}
//         />

//         <link
//           rel="canonical"
//           href={`https://drankushgarg.com/blog/${slug}`}
//         />

//         {/* Open Graph */}
//         <meta property="og:title" content={blog.title} />
//         <meta
//           property="og:description"
//           content={
//             blog.excerpt ||
//             "Expert Ayurvedic insights on mental wellness by Dr. Ankush Garg."
//           }
//         />
//         <meta property="og:type" content="article" />
//         <meta
//           property="og:url"
//           content={`https://drankushgarg.com/blog/${slug}`}
//         />
//         <meta property="og:image" content={blog.image} />

//         {/* Twitter */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={blog.title} />
//         <meta
//           name="twitter:description"
//           content={
//             blog.excerpt ||
//             "Read this mental wellness article by Dr. Ankush Garg."
//           }
//         />
//         <meta name="twitter:image" content={blog.image} />

//         {/* Article Meta */}
//         <meta property="article:published_time" content={blog.date} />
//         <meta property="article:author" content="Dr. Ankush Garg" />
//       </Helmet>

//       {/* PAGE CONTENT */}
//       <section className="bg-[#f9faf7] px-4 sm:px-6 py-10 sm:py-14">
//         <div className="max-w-6xl mx-auto">

//           {/* Back link */}
//           <Link
//             to="/blog"
//             className="inline-block text-green-700 font-semibold mb-5"
//           >
//             ← Back to Blog
//           </Link>

//           {/* Blog Image */}
//           <img
//             src={blog.image}
//             alt={blog.title}
//             className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover rounded-2xl"
//           />

//           {/* Content Card */}
//           <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 mt-6 md:-mt-20 relative shadow-sm">

//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
//               {blog.title}
//             </h1>

//             <p className="text-sm text-gray-400 mt-2">
//               Published on {new Date(blog.date).toDateString()}
//             </p>

//             {/* Blog Content */}
//             <div
//               className="prose prose-base sm:prose-lg max-w-none mt-6
//                          prose-img:rounded-xl
//                          prose-headings:text-gray-800
//                          prose-p:text-gray-700"
//               dangerouslySetInnerHTML={{ __html: blog.content }}
//             />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axiosInstance from "../api/axiosInstance";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Blog not found", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Process content to ensure links open in new tab and have proper security attributes
  const processContent = (content) => {
    if (!content) return '';
    
    // Create a temporary div to parse the content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Find all anchor tags and add target="_blank" and rel="noopener noreferrer"
    const anchors = tempDiv.querySelectorAll('a');
    anchors.forEach(anchor => {
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noopener noreferrer');
      
      // Add a small external link icon or indicator if needed
      // You can add a class for styling
      anchor.classList.add('external-link');
    });
    
    return tempDiv.innerHTML;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-600 mb-3">Blog not found</p>
        <Link to="/blog" className="text-green-700 underline font-medium">
          Back to blogs
        </Link>
      </div>
    );
  }

  // Process the content
  const processedContent = processContent(blog.content);

  return (
    <>
      {/* 🔥 BLOG SEO */}
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
          content={`Dr Ankush Garg, mental wellness, Ayurveda, ${blog.category || "mental health blog"}`}
        />

        <link
          rel="canonical"
          href={`https://drankushgarg.com/blog/${slug}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={
            blog.shortDescription ||
            "Expert Ayurvedic insights on mental wellness by Dr. Ankush Garg."
          }
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://drankushgarg.com/blog/${slug}`}
        />
        <meta property="og:image" content={blog.image} />

        {/* Twitter */}
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

        {/* Article Meta */}
        <meta property="article:published_time" content={blog.date} />
        <meta property="article:author" content="Dr. Ankush Garg" />
      </Helmet>

      {/* PAGE CONTENT */}
      <section className="bg-[#f9faf7] px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">

          {/* Back link */}
          <Link
            to="/blog"
            className="inline-block text-green-700 font-semibold mb-5 hover:text-green-800 transition-colors"
          >
            ← Back to Blog
          </Link>

          {/* Blog Image */}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover rounded-2xl shadow-lg"
            />
          )}

          {/* Content Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 mt-6 md:-mt-20 relative shadow-sm">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-gray-800">
              {blog.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
              <span>Published on {new Date(blog.date).toDateString()}</span>
              {blog.category && (
                <>
                  <span>•</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            {blog.shortDescription && (
              <p className="text-gray-600 italic border-l-4 border-green-500 pl-4 my-4">
                {blog.shortDescription}
              </p>
            )}

            {/* Blog Content - with linked images support */}
            <div
              className="prose prose-base sm:prose-lg max-w-none mt-8
                         prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto
                         prose-headings:text-gray-800 prose-headings:font-bold
                         prose-p:text-gray-700 prose-p:leading-relaxed
                         prose-a:text-green-700 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-gray-800
                         prose-ul:list-disc prose-ol:list-decimal
                         prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:pl-4 prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Share Section */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Share this article:</p>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://drankushgarg.com/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://drankushgarg.com/blog/${slug}`)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-600 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://drankushgarg.com/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom styles for linked images */}
      <style jsx>{`
        /* Style for linked images */
        .prose a:has(img) {
          display: inline-block;
          text-decoration: none;
          border: none;
          transition: transform 0.3s ease;
        }
        
        .prose a:has(img):hover {
          transform: scale(1.02);
        }
        
        .prose a:has(img) img {
          transition: box-shadow 0.3s ease;
        }
        
        .prose a:has(img):hover img {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        }
        
        /* Style for external links */
        .prose a.external-link:not(:has(img))::after {
          content: "↗";
          display: inline-block;
          margin-left: 4px;
          font-size: 0.8em;
          vertical-align: super;
        }
      `}</style>
    </>
  );
}